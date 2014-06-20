# Warning: Alpha software.

# What is it?

This is the server that the Scholar Ninja extension connects to for signaling, i.e. forming WebRTC connections.

# Install node

```
wget http://nodejs.org/dist/v0.10.28/node-v0.10.28.tar.gz
tar -zxvf node-v0.10.28.tar.gz
cd node-v0.10.28
yum groupinstall "Development Tools"
yum install make
sudo make install
```

# Clone and install dependencies

```
git clone git@github.com:ScholarNinja/server.git
npm install
```

# Run server

```
./start.sh
```

## Optional

### Install STUN/TURN
https://code.google.com/p/coturn/wiki/Downloads
sudo apt-get install build-essential libssl-dev libevent-dev libhiredis-dev

### Open ports in Security group:
TCP 443
TCP 3478-3479
TCP 32355-65535
UDP 3478-3479
UDP 32355-65535

Launch with (EC2 example):
sudo turnserver --syslog -a -L ‘amazon ec2 PRIVATE ip address’ -X ‘amazon ec2 PUBLIC ip address’ -E ‘amazon ec2 PRIVATE ip address’ -f --min-rt=32355 --max-port=65535 --user=’my_username’:’my_password’ -r realm --log-file=stdout -v