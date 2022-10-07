# herolist_Front End
Front end for Heroes Hire, a platform for Hero Agency to list Heroes to be viewed by public
details : https://vxyagr.gitbook.io/hiroes-heroes-for-hire/

# Installation
1. Get the code to a directory<br/>
2. Make sure you already have npm installed<br/>
3. Edit /components/Endpoints.txt File, change :<br/>
export const base = "http://localhost:8000/"; change it to your BACKEND base domain and port<br/>
export const create = base + "hero/"; this should only be changed to match the backend endpoint address<br/>
export const getAll = base + "hero/"; this should only be changed to match the backend endpoint address<br/>
export const findOne = base + "hero/"; this should only be changed to match the backend endpoint address<br/>
export const findByPower = base + "hero/power/"; this should only be changed to match the backend endpoint address<br/>
export const findByAgency = base + "hero/agency/"; this should only be changed to match the backend endpoint address<br/>
export const deleteHero = base + "hero/delete/"; this should only be changed to match the backend endpoint address<br/>
export const updateHero = base + "hero/update/"; this should only be changed to match the backend endpoint address<br/>

4. make sure the Backend is already running and ready to serve their API
5. open terminal and go to the directory, run "npm install"<br/>
6. still on the terminal, run "npm run dev"<br/>
7. Apps (Front End) is ready to serve on the port you set.
