import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';

import { hide } from './flashMessageSlice';

import './index.scss';

function FlashMessage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const hideMessage = () => {
    dispatch(hide());
  };

  const [show, setShow] = useState(false);

  const elem = useRef(null);

  const title = useSelector((state) => state.flashMessage.title);
  const message = useSelector((state) => state.flashMessage.message);
  const isActive = useSelector((state) => state.flashMessage.isActive);
  const type = useSelector((state) => state.flashMessage.type);

  useEffect(() => {
    if (elem.current) {
      if (isActive) {
        setShow(isActive);
      }

      gsap.to(elem.current, .2, {
        opacity: +isActive,
        onComplete: () => {
          if (!isActive) {
            setShow(isActive);
          }
        }
      });
    } else {
      setShow(isActive);
    }
  }, [isActive]);

  if (show) {
    return (
      <div id="flash-message" className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-4" ref={elem}>
        <div className='flex items-start w-full'>
          <div className='flex-shrink-0'>
            {
              type === "info" ?
                <FontAwesomeIcon icon={faCheckCircle} className='h-5 w-5 text-green-400' />
                :
                <FontAwesomeIcon icon={faXmarkCircle} className='h-5 w-5 text-red-400' />
            }
          </div>
          <div className='flex-1 text-left ms-5'>
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className='flex flex-shrink-0'>
            <FontAwesomeIcon className='text-gray-400 hover:text-gray-500 cursor-pointer' icon={faXmark} onClick={hideMessage} />
          </div>
        </div>
      </div>
    );
  }
};

export default FlashMessage;
