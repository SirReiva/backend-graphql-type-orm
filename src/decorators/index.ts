import { getRepository } from 'typeorm';

export const InjectRepo = (entity: Function) => (target: any, key: string) => {
    const sKey = Symbol(key);
    Object.defineProperty(target, key, {
        get: function () {
            if (!this[sKey]) this[sKey] = getRepository(entity);
            return this[sKey];
        },
    });
};
