# node-ec2

# How I solve this problem?

<p>First of all, you need to understand Basic Networking, how one host talk to each other and what is the purpose of bridge.

So, at first this assignment is quite tricky. I don't understand first time and even after watching video i don't understand. </p>

I download the repo and try to figure out what is happening?

> Actually simply there is two services. One service is port is open and that means this port can response anyone. Another service is up but port is off. By default, when user ask for anything it's 
a GET request. so, when i hit the external service port which is running 8081, i am seeing that 
my api is working but one api end point didn't give desired output. I got error!

`localhost:8081/api/v1/add` - this endpoint should talk with internal service api end point.

Now, every container is isolated from each other. And by default, every container attached with bridge. 

> Now i created internal container and it's running and api end point giving 200. 

There are different networking options at Docker.

Default Network bridge

1. Default Network bridge, we have a container host, which have eth0(ethernet adapter) 
2. then it goes into ip tables of linux kernel
3. After that it will go the default network bridge which is called **docker0**
4. Our external and internal container attached to this bridge.

<p>
Now every container has a ip address.Then our external container have a ip address and internal 
container have a ip address. If this container want to communicate each other, we need to give them ip addresses. 
</p>

1. first step **find out the external container ip address**
2. second the **internal container ip address**
3. How to find out container ip address
4. first build the internal dockerfile use this `docker build --no-cache -t internal .`
5. then run the image `docker run -d -p 80:80 internal` (internal container running at port 80)
6. Then same again and run external `docker run -d -p 8081:8081 external` (external container running at port 8081)
7. then i use `docker ps` command to check what's the external and internal container id
8. then i use `docker inspect internal container id` 
9. from there i took the internal container ip address
10. after took ip address i go to external index.js file and at the internalurl variable i put my container variable.
11. then i hit endpoint 'ip address:8081/api/v1/add' it showed me the output which is coming from
internal container 

**Summary: you need to find out only internal container ip & port and put it at InternalURL at index.js**
<br/>
**CHEERS!!!!** :fist:
:fist:
