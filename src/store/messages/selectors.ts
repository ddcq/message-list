import { Message } from '../../types';
import RootState from '../root-state';
import { NAME } from './state';

export const selectMessages: (state: RootState) => Message[] = (state) => {
	return (state[NAME] || {}).messages || [];
};

export const selectLoading: (state: RootState) => boolean = (state) => {
	return (state[NAME] || {}).loading || false;
};

export const selectError: (state: RootState) => string = (state) => {
	return (state[NAME] || {}).error || '';
};
