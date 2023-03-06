# Sipsaker
### Docker Application w/ sipsak command-line tool powered by a node/express application providing OPTION results by HTTP POST results. 

This is a Docker application for running the Sipsak network tool. It includes the Sipsak command-line tool and a Node.js app that provides a REST API for accessing Sipsak functionality. Monitor your VOIP server with Uptime Kuma or other monitoring tools.

Use the source in app.js to build a route in your existing node express application or deploy a simple docker container to run as a sipsaker.

## Installation
To run this application, you will need to have Docker installed on your machine. Once you have Docker installed, you can run the following command to build the Docker image:

### Build Image
Clone the Repository and CD into the sipsaker folder.

```console
docker build -t sipsaker .
```

This command will build the Docker image with the name "sipsaker". 

### Deploy Container
Once the image is built, you can run a Docker container based on the image using the following command:
```console
docker run -p 3000:3000 -d —name sipsaker-container sipsaker
```

This command will start a new Docker container based on the "sipsaker" image, map port 3000 inside the container to port 3000 on the host, and name the container "sipsaker-container". 


## Usage
The Sipsaker Docker application provides an API for accessing Sipsak functionality

 To use the API, send an HTTP POST requests to the following endpoint:
* /sipsak: with a host IP value to "hostIp" and optional value of "hostPort"
* Successful SIP OPTION will return a 200 OK response and SIP server is AVAILABLE
* UN-Successful SIP OPTION with no reply will return a 502 response and SIP server is NOT available

### CURL EXAMPLE
```console
curl -X POST -H "Content-Type: application/json" -d '{"hostIp":"194.201.25.19"}' http://localhost:3000/sipsak
```
```console
curl -X POST -H "Content-Type: application/json" -d '{"hostIp":"194.201.25.19","hostPort":"5080"}' http://localhost:3000/sipsak
```

## UPTIME KUMA Integration Example
* Create a new Monitor with a Monitor Type of HTTP(s)
* Use the URL of your sipsaker application posting to the /sipsak resource
* Change the HTTP Options method to POST
* Assemble some JSON containing at minimum a value for hostIp, and optionally a value for hostPort if it differs from 5060.


![Kuma Dashboard Settings](/kuma-images/uptime-kuma1.png)

200 OK is the response for a good ping.  502 is returned for a bad ping.
![200 OK Value Accepted Range](/kuma-images/uptime-kuma1.png)



For more information on the Sipsak command-line tool and its functionality, [see the official Sipsak documentation.](https://github.com/nils-ohlmeier/sipsak)


This project is licensed under the MIT License - see the LICENSE.md file for details.
