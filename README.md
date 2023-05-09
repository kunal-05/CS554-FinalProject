# CAREER CONNECT


# TEAM MEMBERS
- Arinjay Panwar (*20013410*)
- Dhriti Shah (*20011117*)
- Kunal Mandalya (*20012146*)
- Parul Mahajan (*20010763*)

  <a name="env"> </a>
# INSTALLATION 
- Install the following additional binaries before proceeding
	- [Redis (Stable)](https://redis.io/download)
	- [Imagemagick ](https://imagemagick.org/script/download.php)
		- If on a **windows** machine, imagemagick module has a known bug which makes it unable to read the PATH variable from `ENVIRONMENT`. We have manually set the path to default windows location. If it throws `Error: spawn identify ENOENT` then you may have to set the correct location to `convert.exe` and `identify.exe` binaries which is relative to your machine in `./server/routes/photo.js` file

- Run redis server
- Client
	 ```
	 cd client
	 npm i
	 npm start
	 ```
- Server
	```
	cd server
	npm i
	npm start
	```
