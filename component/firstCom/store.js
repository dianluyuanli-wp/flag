import { observable } from 'mobx';
import BaseComponentStore from '../../baseModel/baseStore';

class firstCom extends BaseComponentStore{
    @observable city = 1;
    @observable gun =1;

    //city = observable(1);
} 

module.exports = firstCom;