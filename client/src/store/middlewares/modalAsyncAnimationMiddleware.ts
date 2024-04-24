import { setModalOpen, showModal, hideModal } from '@@store/modals/slice';
import { sleep } from '@@utils/common/sleep';

const setModalOpenAsync = (dispatch) => {
  return new Promise((resolve) => {
    resolve(
      dispatch(
        setModalOpen({
          isOpen: false,
        }),
      ),
    );
  });
};

const makeDelayedHideModalAction = (callback) => async (dispatch) => {
  await setModalOpenAsync(dispatch);
  await sleep(200);
  callback();
};

export const modalAsyncAnimationMiddleware = (store) => (next) => {
  let hideModalPromise = Promise.resolve();

  return async (action) => {
    const { dispatch, getState } = store;

    if (action.type === hideModal.type) {
      const {
        modals: { modals },
      } = getState();

      hideModalPromise = modals.length
        ? dispatch(makeDelayedHideModalAction(() => next(action)))
        : hideModalPromise;

      return hideModalPromise;
    }

    if (action.type === showModal.type) {
      await hideModalPromise;

      return next(action);
    }

    return next(action);
  };
};
