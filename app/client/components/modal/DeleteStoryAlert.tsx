import React from 'react';
import { toast } from 'react-toastify';
import { AlertCircle } from 'react-feather';
import 'react-toastify/dist/ReactToastify.css';
import { useReactiveVar } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import {
  deleteStoryAlertState,
  initStateOfStoryModal,
} from '../../context/storyState';
import { useStory } from '../../hooks/useStory';
import { DeleteStoryAlertState } from '../../types/state/DeleteStoryAlertState';

const DeleteStoryAlert = (): JSX.Element | null => {
  const router: NextRouter = useRouter();
  const { deleteStory } = useStory();
  const deleteStoryAlert: DeleteStoryAlertState =
    useReactiveVar<DeleteStoryAlertState>(deleteStoryAlertState);

  if (!deleteStoryAlert.isOpen) {
    return null;
  }
  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto z-20 bg-black1 bg-opacity-20"
      onClick={() => {
        deleteStoryAlertState(initStateOfStoryModal);
      }}
    >
      <div
        className="flex flex-col items-center bg-white h-307 rounded-2xl shadow-2xl px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertCircle className="w-45 h-45 text-red1 mt-38 mb-22 py-10" />
        <h2 className="text-xl mb-51">
          {deleteStoryAlert.name}
          <br />
          を削除してよろしいですか？
        </h2>
        <button
          className="w-4/5 bg-red1 py-6 mb-10 rounded-xl text-white"
          onClick={async (event) => {
            event.preventDefault();
            try {
              const {
                data: {
                  deleteStory: { success, message },
                },
              } = await deleteStory(deleteStoryAlert.storyId);
              if (success) {
                toast.success(message);
              }
              deleteStoryAlertState(initStateOfStoryModal);
            } catch (error: any) {
              if (error.message == 'ログインし直してください') {
                toast.error(error.message);
                router.push('/signin');
              }
            }
          }}
        >
          削除
        </button>
        <button
          className="w-4/5 bg-black3 py-6 mb-16 rounded-xl"
          onClick={() => {
            deleteStoryAlertState(initStateOfStoryModal);
          }}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default DeleteStoryAlert;
