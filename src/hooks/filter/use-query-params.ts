'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/** 파라미터 관리 훅 */
export default function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /** 현재 파라미터 (객체) */
  const getParams = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  /** 개별 파라미터 (단일값) */
  const getParam = (key: string) => {
    return searchParams.get(key);
  };

  /** 개별 파라미터 (배열) */
  const getParamAll = (key: string) => {
    return searchParams.getAll(key);
  };

  /** 파라미터 설정 */
  const setParams = (
    newParams: Record<
      string,
      string | number | string[] | number[] | null | undefined
    >,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      // 기존 값 삭제
      params.delete(key);

      if (value === null || value === undefined || value === '') {
        return;
      }

      // 배열인 경우 여러 값 추가
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v !== null && v !== undefined && v !== '') {
            params.append(key, String(v));
          }
        });
        // 단일 값인 경우
      } else {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(url, { scroll: false });
  };

  /** 개별 파라미터 삭제 */
  const removeParam = (key: string) => {
    setParams({ [key]: null });
  };

  /** 모든 파라미터 삭제 */
  const clearParams = () => {
    router.push(pathname, { scroll: false });
  };

  return {
    params: getParams(),
    getParam,
    getParamAll,
    setParams,
    removeParam,
    clearParams,
  };
}
