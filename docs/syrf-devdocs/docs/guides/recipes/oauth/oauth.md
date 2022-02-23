---
sidebar_position: 1
---

# OAuth Overview

## Introduction
OAuth and Open ID Connect are related terms that both allow developers to use external services as "sources of truth" for user identity.
There are 3 scenarios you may want to use SYRF's OAuth or OIDC capabilities. 

* Single Sign On,
* Importing user data,
* Assigning user permissions as part of a more complicated integration.

Before reading this guide, be sure you understand the differences between authorization and authentication.

## Single Sign On

The SSO use case allows developers to build sailing apps that use SYRF for authentication.
This is exactly like apps you've seen with "Sign In With Google/Facebook/GitHub/etc."
You may chose use SYRF accounts so that you don't need to build your own GDPR/CCPA
compliant authentication flow. 

To be honest, if authentication is your only use case, it's probably better to use Google or Facebook
for SSO. That's because SYRF accounts only provide you with an advantage if you want to
import data from a user's SYRF account, or if you want to use our APIs to create sailing events
and you need to know SYRF user information to assign administrative priviledges, or handle other
authorization issues. If you don't plan on importing a user's SYRF data, or running races on LivePing, 
you may as well use an established identity provider. 

For the Single Sign On use case, you will use a technology called Open ID Connect, which is just
a layer over OAuth that defines a specific identity scope.

For step by step instructions on adding SYRF SSO to your apps, follow our guide [here.](/docs/guides/recipes/oauth/sso)


## Importing User Data
The power of OAuth is that it allows 3rd party apps to use an external service for authentication,
while providing the user owners of those accounts with the ability to decide what data to share.
We can provide an API for you to request data about our users while ensuring the users are always
able to decide what to share and when to stop sharing.

A typical use case for this flow would be if your app wanted to import "My Tracks" from a user account, 
or maybe import what organizations they belonged to. 

For step by step instructions on requesting data from your users with SYRF accounts, follow our guide [here.](/docs/guides/recipes/oauth/importuserdata)


## Event Authorization
Recall authorization is different from authentication. Authentication solves the problem of determining a user is who they say they are, 
for example, by checking to see if a password is the correct password. In theory, if only the user knows their password, then anyone
who provides the correct password must be the user they say they are (ha!). Once authenticated, however, we need a different concept
to describe how to restrict what some users can do. For instance, just because I'm authenticated in a system, doesn't mean I should be able
to edit another user's profile. This question of "what is user x allowed to do?" is called authorization. 

Authorization is critical to understand if you're using SYRF APIs to create events or races. Without authorization, anyone with a SYRF
account could edit the events you create though our APIs, or spoof location updates from the ends of the start line.
Luckily we require authorization. 

If you're creating data in the SYRF universe and you expect any human user to be able to edit it, you will use OAuth to tell us
what users should be able to edit things.

For step by step instructions on authenticating users to edit programatic data, follow our guide [here.](/docs/guides/recipes/oauth/authentication)

