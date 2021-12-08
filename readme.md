# HoloKore - Hololive Collection

HoloKore is a simple discord hands-off bot that aggregates the latest updates from all vtubers in each branch within Hololive into a directory-style text channel. Each VTuber gets their own dedicated thread within the channel, and the latest information will be pushed to their respective thread. 

### Usage

Users request their role(their VTuber of interest) in a bot channel, and the bot will assign the role to that user. Once new information has been posted to the thread, that role will be pinged. Every new tweet, new livestream, new public community post will send out a ping to that role. Upcoming livestreams are omitted from pinging.


This bot is hands-off management-wise. As it is running, it will send and update messages/embeds. In case of the vtuber not updating their online presence in the timespan of 24 hours, it is expected that the thread will be deleted for inactivity. An anti-deletion system (similar to anti-AFK) prevents deletion.

### Commands

* !setrole "name"

Requests role of vtuber

Ex: !reqrole "amelia watson"

* !delrole "name"

Removes user from role

Ex: !delrole "amelia watson"

### Features

#### Data Aggregation
* Fetches latest tweet
* Fetches latest livestream
* Fetches latest agency tweet
* Notifies role latest information

#### Role Assignment and Request
* User requests role and gets assigned role.

#### On initial launch

The bot reads the data in ```interest.json```, creates the hololive text channel, and then creates the threads. A new folder, 'mem', will be created. This folder contains files, which are used as backups, to keep track of the role id's, message id's and channel and thread ids. In case of a crash, power outage, or 'acts of Matsuri', the files will maintain order. Deleting the files will require manual deletion of the text channel, threads, and roles.

#### On every launch (post initial launch)

A verification process will take place on every launch to ensure the integrity of ```interest.json``` has not been tampered with. This prevents double creation of text channel, threads, or posts. Once verified, operation resumes normally.

### Current VTubers Supported 

#### HoloJP
Gen 0 - 6

#### HoloID
Gen 1 - 2

#### HoloEN
Myth, Council, and iRyS

### Can this be adapted for other agencies?

Simply add a new entry to the 'agencies' JSON object in ```data.json``` with the correct properties, and relaunch the bot. A new text channel will then be created and labeled the new agency's name.  

### Dependencies
* TBD

### Upcoming Features
* Lore