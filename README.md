# Stress on ethereum - using filter Events

## Description
This repository is a tool to make stress test by searching Events on ethereum networks.

## Requirements
* Docker/Docker-compose
* Nodejs
* Machine running in sync with some network (mainnet, rinkeby or some other public/private network)


### Clone Repository ####

To configure and install Pantheon and Orion, you must clone this git repository in your **local machine**.

```shell
$ git clone https://github.com/eum602/StressFilterEvents.git
```

### Customize your test ###
Edit docker compose to run as many dockers as you want, each of those searching from some block to
another one (eg. From block 0 to block 500000)

```shell
$ vi $PWD/StressFilterEvents/docker-compose.yml

...
environment: &environment
  - FROM=0 #from which block
  - TO=50000 #latest #0,1,latest, etc
  - RPC_URL=http://your_ip:rpc_port
...
```

You can also add the number of parallel filter you want to make by simply copy/paste this block:
```shell
 serverX: #instead of 'X' make sure it varies on each block
     dockerfile: Dockerfile
     context: ./server
   volumes:
    - /app/node_modules
    - ./server:/app
   environment: *environment
```

### Analyze the CPU performance in parallel ###
use your favourite CPU resource monitor to check in real time how the machine(ethereum node) that is performing the search is behaving.