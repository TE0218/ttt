================================================================================
                           SEEBURGER Training Material
================================================================================
Copyright (c) 2014, SEEBURGER AG
================================================================================

Table of Contents

1) Introduction

2) Media Structure
   a) classmaterial
   b) firefoxPortableESR
   c) handout
   d) slides

3) Open Training Documents
   a) Handout
   b) Slides

4) Known Issues

===============================================================================

1) INTRODUCTION
---------------

This document has detailed information for the training material available on
this medium.

===============================================================================

2) MEDIA STRUCTURE
------------------

The structure of the media is listed below.

  +---classmaterial
  +---firefoxPortableESR
  +---handout
  \---slides


    2a) classmaterial
    -----------------

    In the folder classmaterial you will find the material used in the training
    excersices. The material is also linked in the html slides.

    2b) firefoxPortableESR
    ----------------------

    In the folder firefoxPortableESR we ship Firefox as a portable browser which
    is pre-configured to view the html slides.

    2c) handout
    -----------

    In the folder handout you will find the handout as pdf document. Please use
    your preferred pdf reader to open the document.

    2d) slides
    ----------

    In the folder slides you will find the training slides in html. The html
    slides are optimized for Firefox.

===============================================================================

3) Open Training Documents
--------------------------

    3a) Handout
    -----------

    To open the training handout use your preferred pdf viewer already installed
    on your computer. If you don't have a pdf reader installed you can have a look
    at Adobe Reader (http://get.adobe.com/uk/reader/).

    3b) Slides
    ----------

    To open the training slides with a pre-configured FirefoxPortableESR browser
    start openTrainingSlides.exe. FirefoxPortableESR will temporarily copy the
    firefox profile to your windows temp folder as it's not possible to create the
    profile on a write protected media (e.g. CD-Rom). The copy process can take a
    while. After closing the FirefoxPortableESR the temporarily created files will
    be removed as well.

    If you prefer to use your local installed firefox you can open
    slides/index.html manually.

===============================================================================

4) Known Issues
---------------

Starting the FirefoxPortableESR browser will sometimes lead to  requests that
another programm on your computer would like to modify Firefox with an add-on.
This is because other programs (e.g. Java Quick Starter or Microsoft .NET
Framework Assistant) set a link in the Windows Registry to install the add-on.

For our html training slides these add-ons are not necessary and you can just
close these tabs. Keep in mind that these requests will occure every time you
start firefox again.