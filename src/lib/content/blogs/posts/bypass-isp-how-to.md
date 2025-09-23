---
title: How to Bypass ISP Port Blocking
seoTitle: The Ultimate Dark Mode Guide for Web Designers & Developers

description: An intro to the hybrid setup with TS.
seoDescription: A complete guide to dark mode design, accessibility, and performance. Learn how to implement dark mode that works across browsers and devices

author: Yor Qat
date: 2024-04-05
tags:
  - type:tech-tip
  - audience:for-developers

thumbnailHeroCaption: Hacker fighting the tyrannical ISPs
---

Wow you just made your very own, very proud web service whether it be your personal webpage or a convenient API you wrote for your pleasure but there's one problem, you can't receive requests from port 80, you know where you're supposed to get requests?

ISPs already don't give you the privilege of free static IPs to use for your hosting project, to the extent of revoking reception on ports that matter.

With this cold indifference how would you expose your epic home server to the world? That's when get our old friends: **Wireguard** and any of your favorite **VPS** really

## Create a VPS instance

Any VPS provider that can provision a debian-based distro should work. For the sake of simplicity we'll be using linode as our VPS.

1. After you created your Linode account **go to your dashboard** and create a linode instance
<!-- <img class="img" src="/bypass-isp-how-to/0.webp" alt="begin create linode" /> -->
2. Pick a debian-based distro, you may pick Ubuntu but **Debian 11** can cook
<!-- <img loading="lazy" class="img" src="/bypass-isp-how-to/1.webp" alt="pick a debian-based distro" /> -->
3. Choose your region. Feel free to consult their speedtest to see what works for you
<!-- <img loading="lazy" class="img" src="/bypass-isp-how-to/2.webp" alt="pick your region" /> -->
4. Pick the cheapest plan, mine is $5
<!-- <img loading="lazy" class="img" src="/bypass-isp-how-to/3.webp" alt="pick the cheapest plan($5)" /> -->
5. Don't forget to set a root password
<!-- <img loading="lazy" class="img" src="/bypass-isp-how-to/4.webp" alt="decide a root password" /> -->
6. Review your configuration and hit Create
<!-- <img loading="lazy" class="img" src="/bypass-isp-how-to/5.webp" alt="finish create linode" /> -->

## Configure wireguard

Wireguard is a open source, highly configurable VPN software that establishes encrypted tunnels for secure communication

> The following commands are for both your VPS and home server unless mentioned otherwise

1. Make sure packages are up to date before installing wireguard
   ```bash
     $ apt update && apt upgrade
     $ apt install wireguard -y
   ```
   <!-- <img src='/bypass-isp-how-to0.png' alt='begin create linode'/> -->
2. Initiate our wireguard tunnel config

3. This code creates a /etc/wireguard/wg0.conf file and writes preliminary text before where you're supposed to put your private key
   ```bash
     $ (umask 077 && printf "[Interface]\nPrivateKey = " | sudo tee /etc/wireguard/wg0.conf > /dev/null)
   ```
4. Generate private and public keys

5. Aside from appending our private key in _wg0.conf_ and getting our public key from standard output, it's also stored on a **publickey** file. You'll need these to authenticate the peers

   ```bash
     $ wg genkey | sudo tee -a /etc/wireguard/wg0.conf | wg pubkey | sudo tee /etc/wireguard/publickey
   ```

6. Finished _/etc/wireguard/wg0.conf_ for VPS

```yaml
[Interface]
PrivateKey = <generated private key>
ListenPort = 55107
Address = 192.168.4.1

[Peer]
PublicKey = <home server public key>
AllowedIPs = 192.168.4.2/32
```

7. Finished _/etc/wireguard/wg0.conf_ for home server

```yaml
[Interface]
PrivateKey = <generated private key>
Address = 192.168.4.2

[Peer]
PublicKey = <VPS public key>
AllowedIPs = 192.168.4.1/32
Endpoint = <VPS IP>:55107
```

8. Enable ipv4 forwarding by uncommenting this line in **/etc/sysctl.conf** on VPS

```conf
net.ipv4.ip_forward=1
```

```bash
$ sysctl --system</pre>
```

9. Start and enable autostart systemd services on both ends

```bash
$ systemctl start wg-quick@wg0
$ systemctl enable wg-quick@wg0
```

## Testing tunnel

Moment of truth, if you did everything right up to this point, you should be able to observe signs of a working tunnel. For example, you should be able to SSH towards your peer using the internal IP as specified in _wg0.conf_

```bash
$ ping 192.168.4.1 # From home server
$ ping 192.168.4.2 # From VPS
```

## Forwarding traffic through your tunnel

Unfortunately receiving traffic from the VPS won't mean receiving it from the home server. So let's make it so

A few commands include a port `80`: feel free to add rules for other ports that you want, like 443 for https or even port 6443 for kubernetes remote access

```bash
# Drop all existing forwarding rules
$ iptables -P FORWARD DROP

# Forward traffic from VPS to Home through port 80 from your default network interface [eth0] to your wireguard tunnel [wg0]
$ iptables -A FORWARD -i eth0 -o wg0 -p tcp --syn --dport 80 -m conntrack --ctstate NEW -j ACCEPT

# Something
$ iptables -A FORWARD -i eth0 -o wg0 -m conntrack --ctstate  ESTABLISHED,RELATED -j ACCEPT
$ iptables -A FORWARD -i wg0 -o eth0 -m conntrack --ctstate  ESTABLISHED,RELATED -j ACCEPT

# Prerouting
$ iptables -t  nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 192.168.4.2

# Postrouting
$ iptables -t  nat -A POSTROUTING -o wg0 -p tcp --dport 80 -d 192.168.4.2 -j SNAT --to-source 192.168.4.1
```
