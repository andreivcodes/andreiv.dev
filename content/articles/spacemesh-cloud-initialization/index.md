---
title: "Initialize Spacemesh PoST data using cloud GPUs"
date: 2023-09-15T00:00:00+03:00
draft: true
---

# Celebrating a milestone

Hey there! I have some truly exciting news to share with you. The team at [Spacemesh](https://spacemesh.io) has successfully launched their mainnet! 🚀 It's an incredible achievement, and I'm genuinely thrilled for them.

The memorable date was July 14th, a day that marked a significant milestone in their journey. It's the result of the Spacemesh team's perseverance and their tireless dedication to their project.

Their commitment to their vision is nothing short of impressive. With the mainnet now operational, the future indeed looks promising for Spacemesh!

# Now what?

Now that the genesis event is over, we have approximately 10 days to set up our PoST data before the first round begins, as explained in the [genesis timeline](https://spacemesh.io/blog/genesis-timeline/).

Data setup is the computationally intensive part of the Proof of Space and Time algorithm used by Spacemesh.

And it is indeed intensive. While you can generate PoST data on most systems, it operates best with a GPU—a powerful one at that.

However, there's a problem. I don't own a GPU. I only have a MacBook M2, and it's not sufficiently fast for data setup. It's not just slow, but I can't keep it running continuously until it's done, which could take weeks. So, I needed to devise an alternate solution.

# Cloud GPU ?

_Before proceeding further, please be aware of the following risks:_:

- _You will enter your passphrase in a cloud instance, essentially someone else's computer. This is vulnerable to MITM attacks!_
- _We will use [this](https://github.com/selkies-project/docker-nvidia-glx-desktop) Docker image for our environment, which makes it vulnerable to supply chain attacks!_
- _In essence, you're trusting Runpod to run a virtual machine for you, configured by a GitHub user, with instructions provided by me, and trust that they won't spy on your activities inside that virtual machine and then delete all the data after you're done._

_Understood the risks? Great, let's continue._

Enter [runpod](runpod.io).

Runpod is a platform where you can rent GPU power or offer your own GPU to be used by others. If you're not into the whole community thing, they also have their own GPUs, and their pricing is quite competitive.

![Runpod Pricing](images/runpod-pricing.png)

After some very preliminary tests, I discovered that an RTX 4090 can generate approximately 20GB of PoST data per hour.

This means it would cost around $0.03/GB or roughly $30 worth of GPU computing power for each TB.

Remember, this is a very rough estimate. I recommend you to test it out for yourself with the minimum 256GB PoST first.

# The actual guide

- Register for an account on runpod.io.
- Runpod operates on prepaid credits, so you'll need to add some funds [here](https://www.runpod.io/console/user/billing).

  ![Runpod Balance](images/runpod-balance.png)

- Create the template which we will use later

  - Under _My Templates_, create a _New Template_ using these settings

    - Template name: whatever name you prefer
    - Container image: **ghcr.io/selkies-project/nvidia-glx-desktop:latest**
    - Container Disk: **5 GB**
    - Volume Disk: **1050GB**

      _This is the size of the volume which will be used for PoST data generation. In this case, we will generate 1TB of data, so this is slightly bigger than that._

    - Volume Mount Path: **/home/user/post**

      _This is the default path that the Spacemesh App uses for PoST data generation. For convenience, we will mount the volume here._

    - Expose HTTP Ports: **8080,**

      _This will be used for our remote connection inside the VM._

    - Expose TCP Ports: **22,**

      _Just in case you need to ssh into it. Not mandatory._

    - Environment Variables

      _These are very important, so ensure you input them correctly. Their order in the table doesn't matter, but the values do!_

      **PASSWD - whatever password you want**

      **NOVNC_ENABLE - true**

      **NVIDIA_DRIVER_CAPABILITIES - true**

Your setup should look something like this once you're finished:

![Runpod Template](images/runpod-template.png)

- Save the template. Duh.

- Go to _Secure Cloud_ and _Deploy_ a _RTX 4090_ instance. **Ensure you use the template you created earlier; in my case, _sm-nvidia-glx-desktop_.**

![Runpod Deploy](images/runpod-deploy.png)

- Start it up but don't touch it yet! Wait for a few minutes for the docker image to install all the drivers it needs, go grab a coffee or something. Come back in 10 minutes.

- Under _My Pods_, expand your running pod and _Connect_.

![Runpod Connect](images/runpod-connect.png)

- Choose the _HTTP Service_ option

![Runpod Connect](images/runpod-connect-http.png)

- _noVNC_ will open up in a new tab. Go ahead and enter the password you set for the template.

- Go ahead and [download Smapp](https://spacemesh.io/start/) for Linux using Firefox.

- Once it's downloaded, open the KDE menu (the thing which looks like the windows Start menu, with an icon like > ) and open _Konsole_.

- Run the following commands.

```
cd Downloads

sudo chmod +x Sp[tab]
                  ^
Don't actually write "[tab]". Press tab instead. That'll autocomplete the file name.

./ Sp[tab] --no-sandbox
```

This should open Smapp.

- Go ahead and restore or set up a new account. **Don't forget to write down the passphrase!!!**

- Set up PoST generation
  - the default folder - /home/user/post
  - 16 files of 64GB, resulting in 1TB PoST data
  - Nvidia GPU

Data generation will take a long time. It would be a shame if we did something wrong and it's not generating it in the right place, right?

- Come back after about 30 minutes, open the file explorer and go to _/Home/post_. You should see something similar to this

![File Explorer](images/fileexplorer.png)

- Let it do it's job. It will probably take a couple of days.
-
