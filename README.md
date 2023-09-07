This demo covers the use of the Permit FE-SDK - which can be used to adjust frontend experinces according to the authorization policy.
The SDK uses [CASL.js](https://casl.js.org/) to provide an interface for various frameworks including React.
THe inegration is applied via the caslAbility adapter interface.

Take a look at the use of caslAbility in app.tsx:
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

The last thing you need to do is to make sure you have a permit.check route in your backend (in this example app `backendUrl: "http://localhost:4000/"`)
This route provides user, resource and action as get params and returns a permitted object
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

A server example is included in this repository under the server folder
you can run it with
`npm install`

`npm -g install nodemon`

`nodemon test.js`
