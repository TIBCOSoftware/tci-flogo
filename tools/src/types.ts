/**
 * Created by sayinala on 10/02/17.
 */
export function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}

export function jsonToMap<K, V>(jsonStr): Map<K, V> {
    return new Map<K, V>(JSON.parse(jsonStr));
}
