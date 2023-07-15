---
title: "How to initialize Spacemesh data using cloud GPUs"
date: 2023-09-15T00:00:00+03:00
draft: true
---

# Celebrating a milestone

Hey there! I've got some really exciting news to share with you. The team at [Spacemesh](https://spacemesh.io) has successfully launched their main net! 🚀🚀 It's quite the achievement, and I'm genuinely thrilled for them.

The memorable date was July 14th, a day that marked a significant milestone in their journey. It's the result of the Spacemesh team's perseverance and their tireless dedication to their project.

Their commitment to their vision is truly impressive and with the main net now operational, the future certainly looks promising for Spacemesh!

# Now what?

Now that the genesis event is over, we have around 10 days to set up our PoST data before the first round starts, as explained in the [genesis timeline](https://spacemesh.io/blog/genesis-timeline/).

Data setup is the hard part of the Proof of Space and Time algorithm used by Spacemesh.

And it's really hard. While you can generate PoST data on most systems, it works best with a GPU, and a powerful one at that.

But here's the problem... I don't have a GPU. I only have a MacBook M2 and it's not fast enough for data setup. It's not just slow, but I can't keep it running non-stop until it's done, which could take weeks. So I had to come up with a different solution.

# Cloud GPU

_Before going further, please be aware of the following risks_:

- _You will enter your passphrase in a cloud instance. Basically, someone's else computer. This is vulnerable to MITM attacks!_
- _We will use [this](https://github.com/selkies-project/docker-nvidia-glx-desktop) docker image for our environment. This is vulnerable to supply chain attacks!_
- _Basically, you're trusting runpod to run a virtual machine for you, don't look at what you're doing in there and then delete all the data after you're done._

_Risky stuff. Got it? Cool, let's get back to the topic._

Enter [runpod](runpod.io).

Runpod is a platform for renting GPU power or offering your own GPU to be used by someone else. If you're not into that whole community thing, they also have their own GPUs and their pricing is pretty good.

![Runpod Pricing](runpod-pricing.png)

After some _very primitive_ tests, I noticed that RTX 4090 can generate around 20GB of PoST data per hour.

That puts us at around 0.03$ / GB or around 30$ worth of GPU computing power for every TB.
