# Java Parser Grading

Ec2 Instance Setup -

1) Upgrade to Java 8
--> # cd /opt/
--> # sudo wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u121-b13/e9e7ea248e2c4826b92b3f075a80e441/jdk-8u121-linux-i586.tar.gz"

--> # sudo tar xzf jdk-8u121-linux-i586.tar.gz

--> cd /opt/jdk1.8.0_121/

--> sudo alternatives --install /usr/bin/java java /opt/jdk1.8.0_121/bin/java 2

--> sudo alternatives --config java

--> sudo yum install glibc.i686

--> sudo yum install unzip --> unzip file.zip -d destination_folder

2) Install GraphViz 
--> sudo yum install graphviz

3) Install NPM package manager
--> sudo yum install nodejs npm --enablerepo=epel

3) Copy the Jar File in /usr/lib/parser
--> cd /usr/lib
--> mkdir parser
--> scp -i /d/281/admin-key-pair-us-west-1.pem ./umlparser.jar ec2-user@<<server>>:/usr/lib/parser

---copy the project folder
sudo mkdir /usr/lib/parser
sudo chown -R ec2-user /usr/lib/parser


4) Run the jar
--> java -jar /usr/lib/parser/umlparser.jar ./test1 out.png

Alternatively, Run node Process from project directory

 --> nohup node app.js &

##VPC Setup

Create a VPC with a size /16 IPv4 CIDR block.
Create an Internet gateway and connect it to your VPC
Create a default subnet in each Availability Zone.
Create a main route table for your VPC with a rule that sends all IPv4 traffic destined for the Internet to the Internet gateway.

Create a security group and associate it with your VPC.
XXXCreate a default network access control list (ACL) and associate it with your default VPC.
XXXXAssociate the default DHCP options set for your AWS account with your default VPC.

http://jodies.de/ipcalc?host=10.0.0.0&mask1=16&mask2=255.255.255.240

---------------RDS------------------
1. Create DB subnet group with selected subnets
2. create RDS Mysql instance










