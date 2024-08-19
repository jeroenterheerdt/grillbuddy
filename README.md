[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

[![Support the author on Patreon][patreon-shield]][patreon]

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

[patreon-shield]: https://frenck.dev/wp-content/uploads/2019/12/patreon.png
[patreon]: https://www.patreon.com/dutchdatadude

[buymeacoffee]: https://www.buymeacoffee.com/dutchdatadude
[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png

# Grill Buddy
![](icon.png?raw=true)

Grill Buddy is your grilling companion, designed to simplify temperature monitoring during barbecues and cookouts. It seamlessly integrates with your Home Assistant enabled temperature sensors (probes) and supports various presets for proteins (such as beef, pork, and fish) and doneness levels (rare, medium, well-done and more). With Grill Buddy, you can set and monitor the following goals:

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
- [Usage](#step-3-usage)
  
### Step 1: Installation
Install the custom integration (preferably using HACS: add this repository as a custom repository and install Grill Buddy). After downloading Grill Buddy from HACS, add the integration by searcing 'Grill Buddy' in your configuration and follow the prompts.

### Step 2: Configuration
After the integration has been installed, you will find a new panel named 'Grill Buddy' in your side bar. Use it to configure your set up which includes setting up probes, their source sensors and the goals.

### Step 3: Usage
After you set up your probes and have set goals, such as target temperature, you can build automations to do whatever you want with the information that Grill Buddy provides.
For example, if you want to send yourself a notification when your goal has been reached you can use the following set up:

```
alias: Grill Buddy monitoring status for probe `test`
description: ""
trigger:
  - platform: state
    entity_id:
      - sensor.grill_buddy_test
    attribute: Status
    from: goal_not_reached
    to: goal_reached
condition: []
action: []
mode: single
```

You can of course also use the other attributes to do interesting things, such as sending a notification when there is 1 minute to go to reach your target:
```
alias: Grill Buddy trigger less than 1 minute to go for probe `test`
description: ""
trigger:
  - platform: numeric_state
    entity_id:
      - sensor.grill_buddy_test
    attribute: Time to target
    below: 60
condition: []
action: []
mode: single
```

Here's a more advanced automation that combines detailed goal status and time to target for multiple probes:
```
alias: Grill Buddy
description: ""
trigger:
  - platform: state
    entity_id:
      - sensor.grill_buddy_probe_1
      - sensor.grill_buddy_probe_2
      - sensor.grill_buddy_probe_3
      - sensor.grill_buddy_probe_4
      - sensor.grill_buddy_probe_5
      - sensor.grill_buddy_probe_6
    attribute: Goal specific status
    from: below_target_temperature
    id: not_below_target
  - platform: numeric_state
    entity_id:
      - sensor.grill_buddy_probe_1
      - sensor.grill_buddy_probe_2
      - sensor.grill_buddy_probe_3
      - sensor.grill_buddy_probe_4
      - sensor.grill_buddy_probe_5
      - sensor.grill_buddy_probe_6
    attribute: Time to target (s)
    below: 60
    id: time_to_target_below_60
condition: []
action:
  - choose:
      - conditions:
          - condition: trigger
            id:
              - not_below_target
        sequence:
          - service: notify.my_phone
            data:
              title: Grill temperature on or above target!
              message: >-
                Source: {{trigger.entity_id}}, preset:
                {{trigger.to_state.attributes.Preset}}
      - conditions:
          - condition: trigger
            id:
              - time_to_target_below_60
        sequence:
          - service: notify.my_phone
            data:
              title: Grill temperature almost reached!
              message: "{{trigger.to_state.attributes.Preset}}"
mode: single

```
## todo and wishlist
- add to hacs
- presets:
  - hot smoke (52-80 C)
  - cold smoke (20-30 C)
  - bbq smoke (102-110 C)
  - hamburger: 75C
- steak timer (cut type/thickness)
- timer handling per probe
- which services do we need?
