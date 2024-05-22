[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

[![Support the author on Patreon][patreon-shield]][patreon]

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

[patreon-shield]: https://frenck.dev/wp-content/uploads/2019/12/patreon.png
[patreon]: https://www.patreon.com/dutchdatadude

[buymeacoffee]: https://www.buymeacoffee.com/dutchdatadude
[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png

# Grill Buddy
Grill Buddy is your best friend for when you're grilling or bbqing! Grill Buddy makes it easy to use any Home Assistant integrated temperature probe and monitor your cooking. It includes presets for many proteins (beef, pork, vish, etc) as well as doneness (rare, medium, well-done, etc). You can ask Grill Buddy to monitor these goals:
- target temperature
- temperature between certain values
- temperature outside certain values
- temperature below a certain value
- temperature above a certain value

Whenever the goal has been reached, Grill Buddy will update the status to ```goal_reached```. Also, you will be able to see detailed status of your thermometer probe depending on the goal.

What's more Grill Buddy will even predict when you are going to reach your target temperature so you plan ahead! Happy grilling!

![](icon.png?raw=true)

## Configuration
In this section:
- [Installation](#step-1-installation)
- [Configuration](#step-2-configuration)
  
### Step 1: Installation
Install the custom integration (preferably using HACS). After downloading Grill Buddy from HACS, add the integration by searcing 'Grill Buddy' in your configuration and follow the prompts.

### Step 2: Configuration
After the integration has been installed, you will find a new panel named 'Grill Buddy' in your side bar. Use it to configure your set up which includes setting up probes, their source sensors and the goals.




## todo
- add to hacs
- expand readme with automation examples
- change logic to generic status
