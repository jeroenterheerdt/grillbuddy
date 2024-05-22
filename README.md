[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

[![Support the author on Patreon][patreon-shield]][patreon]

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

[patreon-shield]: https://frenck.dev/wp-content/uploads/2019/12/patreon.png
[patreon]: https://www.patreon.com/dutchdatadude

[buymeacoffee]: https://www.buymeacoffee.com/dutchdatadude
[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png

# Grill Buddy
![](icon.png?raw=true)

Grill Buddy is your grilling companion, designed to simplify temperature monitoring during barbecues and cookouts. It seamlessly integrates with Home Assistant and supports various presets for proteins (such as beef, pork, and fish) and doneness levels (rare, medium, well-done and more). With Grill Buddy, you can set and monitor the following goals:

- **Target Temperature**: Specify the desired temperature for your food.
- **Temperature Range**: Monitor temperatures within specific value ranges.
- **Out-of-Range Alerts**: Receive notifications when temperatures fall outside certain limits.
- **Threshold Alerts**: Get notified when temperatures go below or above a specific value.

Once your cooking goal is achieved, Grill Buddy updates the status to “goal reached.” Additionally, it provides detailed information about your thermometer probe’s status based on the chosen goal. Plus, it even predicts when you’ll reach your target temperature, allowing you to plan ahead! 🌡️🔥🍖

Remember to fire up the grill and enjoy your perfectly cooked meals! 🎉🔥


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
