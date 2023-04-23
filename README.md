#Tobygachi

## Inspiration
On the drive up to LA, we were discussing topic ideas when TONY BRAKED REALLY REALLY HARD *cough cough*

This reminded us of the Ford Fusion’s Efficiency Leaves feature, which gamifies the idea of fuel efficiency. The dashboard grows leaves and flowers when the vehicle reaches a certain level of fuel efficiencies, such as when users accelerate and brake smoothly. However, these leaves and flowers will die when the driver does “jackrabbit" starts, rapid acceleration, and hard braking, which can lower fuel economy by 15 to 30 percent at highway speeds and 10 to 40 percent in stop-and-go traffic.

![Ford Fusion’s Efficiency Leaves](https://cdn.discordapp.com/attachments/763579631429222433/1099734964729286819/image.png&height=1274)

For Ford Fusion users, when they grew the maximum number of flowers, they would have saved about $8,000 in fuel costs and 30 tons of CO2 over the life of the car. That’s a lot of savings, both monetary and environmental!

> “A typical passenger vehicle emits about 4.6 metric tons of carbon dioxide per year.”

> “​Greenhouse gas (GHG) emissions from transportation account for about 27 percent of total U.S. greenhouse gas emissions, making it the largest contributor of U.S. GHG emissions. Between 1990 and 2020, GHG emissions in the transportation sector increased more in absolute terms than any other sector.”
<br>
> _-- The United States Environmental Protection Agency_

One of the first Ford Fusion test driver’s daughter was in the car when he was driving, and noticed something was happening when he made a sudden stop. 
“‘Daddy, you’re killing the leaves.’ This metaphor was getting users to care about ‘growing this fake vine.”

When we heard about how users were getting attached to their efficiency leaves, we were reminded of the Tamagotchi, a popular toy from the 1990s and early 2000s. Users would care for their pets in the Tamagotchi and many would get emotionally attached, dedicating a lot of time to caring for them. 

What if we incorporated these ideas of building emotional attachments to a character and helped them improve their fuel efficiency (and selfishly, less hard braking)? The user would be incentivized to use the app because it would save them money in gas or electricity, which, in turn, reduce individuals' carbon footprints. 

## What it does
***Tobygachi*** will take advantage of your mobile device's accelerometer in order to detect and analyze the user's driving skills, specifically their speeding and braking habits, and communicate it to the user via Toby's different moods. We want to show Toby as happy when the user exhibits good driving habits and sad when exhibiting bad on.  Therefore, Toby's emotions also serve as an indicator of the user's fuel efficiency.  Once a user ends their trip, they are able to view their number of smooth and sudden accelerations, decelerations, and turns, as well as tips for further fuel efficiency.

## How we built it
![tech stack](https://media.discordapp.net/attachments/1082802524886679632/1099697242954289222/Screenshot_2023-04-23_at_7.02.08_AM.png?width=2092&height=1274)

### Designing the perfect companion
![toby design](https://media.discordapp.net/attachments/1082802524886679632/1099697243222716506/Screenshot_2023-04-23_at_7.01.40_AM.png?width=2092&height=1210)

We centered our design system around our mascot, Toby. Taking his color scheme as well as a few accent colors, we created our own scheme for our designs. For accessibility, we chose contrasting colors as well as a readable font to increase the readability of our text. Our main screen features different animations of Toby's emotions, or reactions, to the driver's actions. Since the user will be driving, we decided to keep these animations as minimal as possible to avoid distracting the driver. We used ***Figma*** and ***Adobe Photoshop*** to create each screen design and ***Adobe Photoshop*** to create animations of Toby. 

### The X, the Y, and the Z of it all
In order to track a driver's movement and determine what counts as a "good acceleration" or "bad brake", we used Expo DeviceMotion to take advantage of phone accelerometers. Our calculations built on top of physics kinematic equations in order to extrapolate a user's velocity and distance traveled.  We based our thresholds for the recommended range of acceleration and deceleration for safe driving off of previous research by Chigurupati et al., who studied integrated computing systems for measuring driver safety.  Citing previous research, they pose that safe accelerations forward and backward as well as side to side are do not exceed 3 meters per second squared. 

### To all the APKs I ever downloaded before

We take advantage of ***React-Native*** and ***Expo*** toolsets to be able to build a native app for both the Android and iOS platforms, leveraging mobile devices' built-in accelerometers.  This also means one of our developers currently has 20 APK files on their phone.

## Challenges we ran into
For 1 of our designers, it was their first time learning Figma, so there was a definite learning curve that they experienced. As for our 2 developers, their experiences with React.js and the many subtle differences between React.js and React-native posed a different set of frustrations. 

## Accomplishments that we're proud of
Build an app that we truly believed in, as well as have fun all while attending our first in-person Hackathon.

## What we learned
Our new designers learned Figma and Adobe Photoshop, and as for our developers, they had a chance to learn React Native along with Expo for native iOS and Android Development.

## What's next for Tobygachi
with Tobygachi, our app runs entirely locally, meaning scalability is not an issue. in the future, we could incorporate user data in more ways to help them find trends in their driving, meaning we could add a server-side database. 

As for scope, our scope is fairly small, focusing on one main feature of identifying harsh stops and starts and communicating these to the user through Toby. This way, we could polish it within the LA Hacks timeline, but we have some future feature ideas such as integrating more device data and integrating with navigation apps that we hope to incorporate later! 
