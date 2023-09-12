/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useEffect, useState } from 'react';
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useAddDeviceTokenMutation } from "../app/users/usersApiSlice";

const VAPID_KEY = process.env.REACT_APP_vapidKey;

console.log("vapidkey", process.env.REACT_APP_vapidKey);

export async function foregroundMessage() {
  try {
    const msg = await messaging();
    const fcmToken = await getToken(msg, { vapidKey: VAPID_KEY });
    if (fcmToken) {
      onMessage(msg, (message) => {
        console.log("foreground msg", message.notification);
        new Notification(message.notification.title, {
          body: message.notification.body,
        });
      });
    } 
  } catch (error) {
    console.error("Unable to get messaging token.", error);
  }
}

// Saves the messaging device token to Cloud Firestore.
const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          const msg = await messaging();

          // Check if permission is granted before retrieving the token
          if (permission === 'granted') {
            // console.log("hoce get token")
            const currentToken = await getToken(msg, {
              VAPID_KEY
            });
            if (currentToken) {
              setToken(currentToken);
              console.log("hoce set token")
            } else {
              console.log(
                'No registration token available. Request permission to generate one.'
              );
            }
          }
        }
      } catch (error) {
        console.log('An error occurred while retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
