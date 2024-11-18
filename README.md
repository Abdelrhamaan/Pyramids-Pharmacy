# Online Book Store

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Description

A simple project to upload Create, list and access dashboard for medicines.

## Features

1. Create new medicine.
2. List medicines uploaded by other users.
3. Request Refill.
4. Dasboard to see refill requests .

## Technologies

1. **BackEnd**:

   - Django
   - Django REST Framework
   - Django Admin

2. **FrontEnd**:

   - React
   - React Router DOM
   - Context API
   - Material UI
   - Axios
   - chartjs

3. **Database**:

   - PostgreSQL

4. **Containerization**:

   - Docker
   - Docker Compose

5. **Deployment**:
   - Aws
   - CloudFormation Template

## Installation

1. Clone repository

   ```bash
        git clone https://github.com/Abdelrhamaan/Pyramids-Pharmacy
   ```

2. Open your AWS account, go to ec2 instances then create keypair from the left side pair then download it and put it in project folder

3. Change the (KeyName: CloudFormationKeyPair) in the cloud formation template to your key name

4. In your Aws Account go to cloud formation

5. Create new stack

6. Choose upload template file and upload CloudFormation.yml

7. Connect To Your Ec2 instance, go to instances choose your instance and click on connect then browse to SSH and take the below command
   it will be some thing like that

   ```bash
       ssh -i "CloudFormationKeyPair.pem" ec2-user@ec2-3-92-3-105.compute-1.amazonaws.com
   ```

8. Add Allowed Hosts change ec2-3-92-3-105.compute-1.amazonaws.com to your ec2 dns name or ec2 ip

```bash
   sudo chown ec2-user:ec2-user settings.py
   nano settings.py
```

9. add this line at the end of the file
   -ALLOWED_HOSTS = ['instance domain name(ec2-3-92-3-105.compute-1.amazonaws.com)', 'ec2ip']

## Usage


1. You can create users by two ways :

- first way run this command docker exec -it pyramids-pharmacy-backend-1 python manage.py createsuperuser
- second way go to this url http://<ec2ip or ec2 dns>:3000/signup

2. enter to project by two ways :

- first way django admin panel http://<ec2ip or ec2 dns>:8000/admin
- second way go to react login page http://<ec2ip or ec2 dns>:3000/login

3. after login you can go to create new Medicine to create Medicine from navbar new medicine
4. after adding new medicines you can request refill
5. then you can go to dashboards to see charts for your requests
