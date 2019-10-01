#!/usr/bin/env python
# coding: utf-8

import torch
from django_plant.utils.yaml_read import parse
from django_plant.neural_network.resnet_v2_sn import resnetv2sn50
import os
from torchvision import transforms
from PIL import Image
import torch.nn.functional as F
import numpy as np
class Inference:
    def __init__(self):
        # load config
        self.config = parse()
        # load species model
        species_config = self.config['sixtyone']
        species_config['logger'] = False
        species_config['use_tensorboard'] = False

        #classfier model
        self.species_model = resnetv2sn50(num_classes=species_config['num_classes'],keep_prob=species_config['keep_prob'])
        ckpt_model=torch.load('./django_plant/ckpt/resnet50_sn_dict.path')
        self.species_model.load_state_dict(ckpt_model)

        #refuse model
        # self.refuse_model = resnetv2sn50(num_classes=2,keep_prob=species_config['keep_prob'])
        # ckpt_refuse = torch.load('./django_plant/ckpt/refuse_model.path')
        # self.refuse_model.load_state_dict(ckpt_refuse)

        os.environ['CUDA_VISIBLE_DEVICES'] = '0'
        torch.manual_seed(5)
        torch.cuda.manual_seed(5)
        torch.cuda.manual_seed_all(5)
        self.species_model.cuda()
        #self.refuse_model.cuda()
        print("模型加载成功...")
    def inference(self, img_path):
        dic = {}
        compose = transforms.Compose([
            transforms.Resize([224, 224]),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.463218, 0.48650995, 0.40001142],
                std=[0.19403107, 0.17286421, 0.21412726])
        ])
        image = Image.open(img_path)
        image = image.convert('RGB')

        #calculate the green pixel
        sum_pix=0
        hsv_list=[]
        print(image.size)
        for count,(r,g,b) in image.getcolors(image.size[0]*image.size[1]):
            hsv_list.append((count,self.rgb2hsv(r,g,b)))
        pix_sel=0
        pix_sum=0
        for count,(h,s,v) in hsv_list:
            if (h>=35 and h<=77) and (s>=43 and s<=255) and (v>=46 and v<=255):
                pix_sel+=count
            pix_sum+=count
        pixel_rate=pix_sel/pix_sum

        #enlarge the pic
        image1 = image.transpose(Image.FLIP_LEFT_RIGHT)
        image2 = image.transpose(Image.FLIP_TOP_BOTTOM)
        image = torch.stack([compose(image), compose(image1), compose(image2)])
        image = image.cuda()
        self.species_model.eval()  # test state
        #self.refuse_model.eval()
        with torch.no_grad():
            # refuse_result=self.refuse_model(image)
            # refuse_result = refuse_result.mean(0).view(1, -1)
            # _, refuse_pre = torch.max(refuse_result, 1)
            if pixel_rate>0.22:
                dic['isPlant']=1
                output = self.species_model(image)
                output = output.mean(0).view(1, -1)
                _, predicted = torch.max(output, 1)
                result=predicted.item()
                result_softmax=F.softmax(output,dim=1)
                acc=result_softmax[0][result].item()
                acc=acc*100.
                print("类别：{} , acc:{:.2f}".format(result, acc))
                classes = self.config['class']
                result = str(result)
                acc = "{:.2f}".format(acc)
                result_list = classes[result]
                result_list.append(acc)
                dic['result'] = result_list[0]
                dic['plant'] = result_list[1]
                dic['type'] = result_list[2]
                dic['disease'] = result_list[3]
                dic['info'] = result_list[4]
                dic['symptom'] = result_list[5]
                dic['prevent_cure'] = result_list[6]
                dic['level'] = '一般'
                dic['acc'] = result_list[7]
            else:
                dic['isPlant']=0

        return dic

    def rgb2hsv(self,r, g, b):
        r, g, b = r/255.0, g/255.0, b/255.0
        mx = max(r, g, b)
        mn = min(r, g, b)
        m = mx-mn
        if mx == mn:
            h = 0
        elif mx == r:
            if g >= b:
                h = ((g-b)/m)*60
            else:
                h = ((g-b)/m)*60 + 360
        elif mx == g:
            h = ((b-r)/m)*60 + 120
        elif mx == b:
            h = ((r-g)/m)*60 + 240
        if mx == 0:
            s = 0
        else:
            s = m/mx
        v = mx
        return int(h/2), int(s*255), int(v*255)


