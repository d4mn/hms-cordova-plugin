/*
    Copyright 2020-2022. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import { AccountIcon, AuthAccount, AuthParams, SignInData } from './HMSCommonTypes';
export declare function signIn(signInData: SignInData, packageName: String): Promise<AuthAccount>;
export declare function signOut(): Promise<void>;
export declare function cancelAuthorization(): Promise<void>;
export declare function silentSignIn(authParams: AuthParams, packageName: String): Promise<AuthAccount>;
export declare function getChannel(): Promise<AccountIcon>;
export declare function getIndependentSignIn(accessToken: string): Promise<AuthAccount>;
