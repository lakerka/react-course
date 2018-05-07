import React, { Component } from 'react';
import { createStore } from 'redux'

import reducer, { initialState } from './reducers';

const store = createStore(reducer);

export default store;