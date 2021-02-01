# Deployment project on Docker

Short instruction how to deploy our full-stack project using Docker

## Getting started

### Prerequisities

In order to run container you should have docker being installed

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

* First of all, you should clone project

```shell
git clone https://gitlab.com/devloop/anygo/backend/api.git
```

* In order to build containers, enter the next command:
```shell
docker-compose build
```
* In order to run containers, enter the next command:
```shell
docker-compose up
```

When all pulls complete, the docker will run a container and API wil be listening on `0.0.0.0:8083`