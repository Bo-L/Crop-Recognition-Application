# Crop-Recognition-Application(Completed in May 2019)
Upload photos to check if they are crops. If it is a crop, then the server judges the type of crop and the type of disease.

# Method
Server: Django Framework 

App: WeChat Mini Program

# Implement Detail
In app, I use the post request to send the pictures to server.

In server, I use the pre-trained ResNet50V2 model to classify the type of crop disease, then use the http to response the result.

# Result 

![Image text](https://raw.githubusercontent.com/Bo-L/Crop-Recognition-Application/master/pictures/p1.jpg)  
![Image text](https://raw.githubusercontent.com/Bo-L/Crop-Recognition-Application/master/pictures/p2.jpg)
![Image text](https://raw.githubusercontent.com/Bo-L/Crop-Recognition-Application/master/pictures/p3.jpg)
![Image text](https://raw.githubusercontent.com/Bo-L/Crop-Recognition-Application/master/pictures/p4.jpg)
![Image text](https://raw.githubusercontent.com/Bo-L/Crop-Recognition-Application/master/pictures/p5.jpg)
