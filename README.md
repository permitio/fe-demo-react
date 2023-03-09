This demo is demonstrating the use of permit fe sdk

Notice the use in app.tsx
There I load the ability
```js
  useEffect(() => {
  // It is good to load permission state as soon as possible in the app
  getAbility().then((caslAbility: any) => {
    setAbility(caslAbility as any);
  });
  }, []);
  ```

From CaslAbility.ts
Note that you need to set the real loggedInUser, and the url of your backend permit check url
and in the next line to add all action and resources you want to check
```js
export const getAbility = async () => {
    const permit = Permit({loggedInUser: "odedbd@gmail.com", backendUrl: "http://localhost:4000/"});
    await permit.loadLocalState([{ action: "create", resource: "file" }, { action: "update", resource: "file" }, { action: "delete", resource: "file" }, { action: "read", resource: "file" }]);
    const caslConfig = permitState.getCaslJson();
    return caslConfig && caslConfig.length? new Ability(caslConfig) : undefined ;
}
```

In the child component you need also to load the ability and use it to check permissions
```js
  // in this use effect you can get your ability from state or from api
  useEffect(() => {
  getAbility().then((caslAbility: any) => {
    setAbility(caslAbility as any);
  });
  }, []);
```

After this you are free to check permissions in your frontend
```js
        {/* you can check permissions with permit check to permission status */}
        {permitState?.check("create", "file") && <p>permit raw create file</p>}
        {permitState?.check("update", "file") && <p>permit raw update file</p>}
        {/* you can check permissions with casl Can component */}
        <Can I="create" a="file" ability={ability}>
          Yes, you can create file!
        </Can> 
```

The last thing you need to do is to make sure you having a permit check route in your backend (in this example app `backendUrl: "http://localhost:4000/"`)
This route gets user, resource and action as get params and returns an permitted object
{permitted: boolean}
Here is an example to such route:
```js
// add route that get user resource and action as get parameters and check if user is permitted
app.get("/", async (req, res) => {
  const { user, resource, action } = req.query;
  const permitted = await permit.check(user, action, resource); 
  res.send({permitted});
});
```

I've added this server to this repository under the server folder
you can run it with
`npm install`

`npm -g install nodemon`

`nodemon test.js`