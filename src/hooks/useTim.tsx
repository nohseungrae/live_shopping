import TIM from 'tim-js-sdk';
import { tim } from '..';
import { Constants } from '../constants/common_constants';
import { useCallback } from 'react';
//이것은 IM 게정 생성을 위한 유저 정보 interface
export interface IUser {
    userID: string;
    avatar: string;
    nick: string;
    gender: string;
}

//TIM 인스턴스 생성
//로그아웃
export const logout = async () => {
    try {
        await quitGroup();
        const logoutResult = await tim.logout();
        if (logoutResult.code === 0) {
            tim.on(TIM.EVENT.SDK_RELOAD, () => {
                console.log('SDK_RELOAD');
            });
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
//로그인
export const login = async (userID: string, userSig: string) => {
    try {
        // if (localStorage.getItem(`TIM_${Constants.appID}_${userID}_profile`)) {
        //     console.log('이미 로그인 되어 있습니다.', localStorage.getItem(`TIM_${Constants.appID}_${userID}_profile`));
        //     return false;
        // }
        console.log(TIM.TYPES, TIM.EVENT, tim, userID, userSig);
        tim.setLogLevel(4);
        //로그인
        const {
            data: { actionStatus },
        } = await tim.login({
            userID,
            userSig,
        });
        if (actionStatus === 'OK') {
            console.log('로그인에 성공했습니다.', actionStatus);
            return true;
        }
        console.log('로그인에 실패했습니다.', actionStatus);
        return false;
    } catch (error) {
        console.log(error, '로그인 에러');
        return false;
    }

    //준비된 경우
    // tim.on(TIM.EVENT.SDK_READY, getAllMessage);
    //메시지가 들어올 경우 - 함수
    // let onMessageReceived = function (event: any) {
    //     setMessageFunc(event.data[0]);
    // };
    //메시지가 들어올 경우
    // tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
};
export const joinGroup = async () => {
    const joinGroup = await tim.joinGroup({ groupID: Constants.groupID, type: TIM.TYPES.GRP_MEETING });
    console.log(joinGroup);
    switch (joinGroup.data.status) {
        case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
            break;
        case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
            console.log(joinGroup.data.group); // 加入的群组资料
            break;
        case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
            break;
        default:
            break;
    }
};
export const myProfile = async ({ userID, nick }: IUser) => {
    try {
        const me = await tim.getMyProfile();
        console.log(me);
        if (me.data.userID === userID && me.data.nick === nick) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
export const updateProfile = async ({ nick, gender, avatar }: IUser) => {
    try {
        console.log(nick, avatar, gender);
        const updateProfileResult = await tim.updateMyProfile({
            nick,
            avatar,
            gender: gender === 'F' ? TIM.TYPES.GENDER_FEMALE : TIM.TYPES.GENDER_MALE,
            allowType: TIM.TYPES.ALLOW_TYPE_ALLOW_ANY,
        });
        console.log('updateProfile', updateProfileResult);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
export const getAllMessage = async () => {
    const groupSearchById = await tim.searchGroupByID(Constants.groupID);
    const joinGroup = await tim.joinGroup({ groupID: Constants.groupID, type: TIM.TYPES.GRP_MEETING });
    switch (joinGroup.data.status) {
        case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
            break;
        case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
            console.log(joinGroup.data.group); // 加入的群组资料
            break;
        case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
            console.log('이미 초대받은 멤버입니다.');
            break;
        default:
            break;
    }
    const conversationID = `${TIM.TYPES.CONV_GROUP}${Constants.groupID}`;
    // const groupID = groupList.data.groupList[0].groupID;
    // const groupName = groupList.data.groupList[0].name;

    const conList = await tim.getConversationList();

    console.log('groupSearchById : ', groupSearchById, conversationID);
    console.log('joinGroup : ', joinGroup);
    console.log('conList : ', conList);
    const groupName = groupSearchById.data.group.name;

    if (groupName === 'saralive') {
        let isCompleted = false;
        let messageListMapping: any[] = [];
        let nextReqMessageID = '';
        for (let index = 0; index < 3; index++) {
            if (!isCompleted) {
                const messageList = await tim.getMessageList({ conversationID, nextReqMessageID, count: 15 });
                nextReqMessageID = messageList.data.nextReqMessageID;
                isCompleted = messageList.data.isCompleted;
                messageListMapping = [...messageList.data.messageList, ...messageListMapping];
            }
        }
        console.log(messageListMapping, 'messageListMapping');
        const messageMapping = messageListMapping
            .map((message: any, index: number) => {
                return {
                    username: message.nick,
                    text: message.payload.text,
                };
            })
            .filter((item: any) => item);
        // console.log('messageList : ', messageList, messageMapping, nextReqMessageID);
        // await getGroupOnlineMembers();
        return { messageMapping };
    }
    return { messageMapping: [] };
};

export const quitGroup = async () => {
    try {
        const quit = await tim.quitGroup(Constants.groupID);
        console.log(quit);
        if (quit.data.groupID !== Constants.groupID) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getGroupOnlineMembers = async (countSetter: any) => {
    try {
        const count = await tim.getGroupOnlineMemberCount(Constants.groupID);
        console.log(count.data);
        countSetter(count.data.memberCount + 1);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
