import { Ability } from '@casl/ability';
import { Permit, permitState } from 'permit-fe-sdk';


export const getAbility = async () => {
    const permit = Permit({loggedInUser: "odedbd@gmail.com", backendUrl: "http://localhost:4000/"});
    await permit.loadLocalState([{ action: "create", resource: "file" }, { action: "update", resource: "file" }, { action: "delete", resource: "file" }, { action: "read", resource: "file" }]);
    const caslConfig = permitState.getCaslJson();
    return caslConfig && caslConfig.length? new Ability(caslConfig) : undefined ;
}

