RECREATE THIS APP SO THAT TELTONIKA CAN USE IT

Name of App Rut

first frontend app:


Admin bord:

dropdown should contain: 

config router 

user board => should use the the search box/textfields of Search & Editsection 


should have a table with user data
and next to it some textfields to create a new user 

in backend limit max users in database to 30 users

limit root admins to only: 5 
admin users to only 10

and the other 15 users are default users


backend: include session, refactor graphql schema/resolvers


implement recatchpa when registering a new user ?


node --trace deprecation



separate routers scripts in: 

rut200,
rut230,
rut240,
rut260,

--------------------------
rut300
rut360

-----------------------
rut850

--------------------
rut901
rut906
rut950
rut951
rut955
rut956



ask to teltonika for rut300, 360: 

firmware latest fw and mass production fw type, is it the same ? 



teltonika rut240

default password: admin01
username: admin 

three kind of user:

CONFIG_ACCOUNTABLE => responsible for configuring routers and can just view basic data 



boolean migratedFromFile: true/false
daten die mittels einer csv datei migriert wurden grünlich markieren


eslint . --fix


frontend: csv preview 


in frontend => app-settings: user can manage files and for example the appropriate info related to a certain .gz file:

SSID_AFTER_BACKUP = "RUT951_A930"
WIFI_PASS_AFTER_BACKUP = "DJA_MN7~Wg<srMzW"
USER_ADMIN_PASSWORD_AFTER_BACKUP = "KFm3)kY$7%r*+>:z"

=> these 3 informations are crucial for sdk restore, but what if sdk has been downloaded from the internet ? do you need a password ? or what will be the credentials be after configuration ? do they remain the same ? 


TODO: FRONTEND => Switch or hack toggle from upload files to use existing files: 

upload files button shows that files are uploaded but actually they are not available, FIXME: actually they are indeed there but only one file 


in frontend: NEW PASSWORDS CAN ONLY BE GENERATED IF DEVICE IS STORED IN DATABASE