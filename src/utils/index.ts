import { BaseEntity } from 'typeorm';

export const isEmpty = (target: Object) => Object.keys(target).length < 1;

export const reloadEntity = async (target: BaseEntity) => {
    if (isEmpty(target)) {
        await target.reload();
        return target;
    }
    return target;
};
