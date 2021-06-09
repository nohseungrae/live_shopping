import { gql, OnSubscriptionDataOptions, useReactiveVar } from "@apollo/client";
import React from "react";
import { isNewQnaInVar } from "../../../apollo";
import { useGetStreamKey } from "../../../hooks/useKey";
import {
  GET_CHAT_QNA,
  useAnswerdChatQnaSub,
  useGetChatQnaList,
  useGetQnaList,
  usePendingChatQnaSub,
  useDeletedChatQnaSub,
} from "../../../hooks/useQna";

interface IProps {
  tab: { [qna: string]: boolean; live_qna: boolean };
}
type P = keyof IProps;
export const FULL_LIVE_CHAT_QNS_FRAGMENT = gql`
  fragment FullLiveChatQnaParts on ShopLiveChatQna {
    id
    title
    content
    answer
    liveId
    userId {
      name
    }
    adminId
    updated_at
  }
`;
export const ANSWERD_CHAT_QNA_SUBSCRIPTION = gql`
  subscription answeredChatQna {
    answeredChatQna {
      ...FullLiveChatQnaParts
    }
  }
  ${FULL_LIVE_CHAT_QNS_FRAGMENT}
`;
export const QnaBody: React.FC<IProps> = ({ tab }) => {
  const { data: getStreamData } = useGetStreamKey();
  const { data: qnaData } = useGetQnaList();
  const { data: liveQnaData } = useGetChatQnaList(
    getStreamData?.getStreamKey?.id
  );

  const isNewQna = useReactiveVar(isNewQnaInVar);

  const pendingUpdate = ({
    client,
    subscriptionData,
  }: OnSubscriptionDataOptions) => {
    console.log(subscriptionData);
    const {
      data: {
        pendingChatQna: {
          adminId,
          answer,
          content,
          id,
          liveId,
          title,
          userId,
          updated_at,
        },
      },
    } = subscriptionData;
    const queryResult = client.readQuery({
      query: GET_CHAT_QNA,
      variables: { input: { liveId } },
    });
    if (queryResult) {
      isNewQnaInVar(true);
      client.writeQuery({
        query: GET_CHAT_QNA,
        variables: { input: { liveId } },
        data: {
          ...queryResult,
          getChatQnaListByLiveId: {
            chatQnaList: [
              ...queryResult?.getChatQnaListByLiveId?.chatQnaList,
              {
                __typename: `ShopLiveChatQna:${id}`,
                id,
                title,
                content,
                answer,
                liveId,
                adminId,
                userId,
                updated_at,
              },
            ],
          },
        },
      });
    }
  };
  const answeredUpdate = ({
    client,
    subscriptionData,
  }: OnSubscriptionDataOptions) => {
    const {
      data: {
        answeredChatQna: { id, liveId, answer, updated_at },
      },
    } = subscriptionData;
    if (liveId) {
      isNewQnaInVar(true);
      client.writeQuery({
        query: GET_CHAT_QNA,
        variables: { input: { liveId } },
        data: {
          getChatQnaListByLiveId: {
            chatQnaList: [
              {
                __typename: `ShopLiveChatQna:${id}`,
                answer,
                updated_at,
              },
            ],
          },
        },
      });
    }
  };
  const deletedUpdate = ({
    client,
    subscriptionData,
  }: OnSubscriptionDataOptions) => {
    const {
      data: {
        deletedChatQna: { id, liveId },
      },
    } = subscriptionData;
    const queryResult = client.readQuery({
      query: GET_CHAT_QNA,
      variables: { input: { liveId } },
    });
    if (queryResult) {
      const newChatQnaList = queryResult.getChatQnaListByLiveId.chatQnaList.filter(
        (item: any) => item.id !== id
      );
      client.writeQuery({
        query: GET_CHAT_QNA,
        variables: { input: { liveId } },
        data: {
          ...queryResult,
          getChatQnaListByLiveId: {
            chatQnaList: newChatQnaList,
          },
        },
      });
    }
  };
  const { data: pendingChatQnaSub } = usePendingChatQnaSub(pendingUpdate);
  const { data: answerdChatQnaSub } = useAnswerdChatQnaSub(answeredUpdate);
  const { data: deletedChatQnaSub } = useDeletedChatQnaSub(deletedUpdate);

  const values = Object.keys(tab)
    .map((key) => {
      if (tab[key]) {
        return key;
      }
    })
    .filter((item) => item);
  console.log(qnaData, liveQnaData);
  console.log(values);
  return (
    <div>
      <h4 className={"blind"}>{values[0]}</h4>
      <div
        className={"box-border overflow-y-auto"}
        style={{ height: "400px", padding: "28px 22px 0" }}
      >
        {values[0] === "qna" ? (
          qnaData?.getQnaList?.qnaList.length < 1 ? (
            <div
              className={"flex h-full justify-center items-center font-medium"}
              style={{ paddingBottom: "20px", color: "#929294" }}
            >
              자주 묻는 질문이 없습니다.
            </div>
          ) : (
            qnaData?.getQnaList?.qnaList.map((item: any, index: number) => {
              return (
                <dl key={index} className={"break-all"}>
                  <dt>
                    <div className={"qna_list_info"}>
                      <time>{item.updated_at}</time>
                      <span className={"side_bar"}>관리자</span>
                    </div>
                    <span className={"qna_list_info_content"}>
                      Q. {item.content}
                    </span>
                  </dt>
                  <dd className={"qna_list_info_answer"}>
                    {item.answer ?? "답변중입니다..."}
                  </dd>
                </dl>
              );
            })
          )
        ) : liveQnaData?.getChatQnaListByLiveId?.chatQnaList.length < 1 ? (
          <div
            className={"flex h-full justify-center items-center font-medium"}
            style={{ paddingBottom: "20px", color: "#929294" }}
          >
            라이브 답글이 없습니다.
          </div>
        ) : (
          liveQnaData?.getChatQnaListByLiveId?.chatQnaList.map(
            (item: any, index: number) => {
              return (
                <dl key={index} className={"break-all"}>
                  <dt>
                    <div className={"qna_list_info"}>
                      <time>{item.updated_at}</time>
                      <span className={"side_bar"}>{item.userId.name}</span>
                    </div>
                    <span className={"qna_list_info_content"}>
                      Q. {item.content}
                    </span>
                  </dt>
                  <dd className={"qna_list_info_answer"}>
                    {item.answer ?? "답변중입니다..."}
                  </dd>
                </dl>
              );
            }
          )
        )}
      </div>
    </div>
  );
};
