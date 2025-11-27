'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PRESERVE_PARAMS } from '@/constants/filter.constant';
import { INTERESTS, ROLE } from '@/constants/profile.constant';
import { getValidPage } from '@/utils/filter.util';

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
  const getArrayParam = (key: string) => {
    return searchParams.getAll(key);
  };

  /** 개별 파라미터 (boolean 값) */
  const getBoolParam = (key: string, defaultValue: boolean = false) => {
    const value = getParam(key);
    if (value === null) return defaultValue;
    return value === 'true';
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

  /** 파라미터 설정 (boolean 값) */
  const setBoolParam = (key: string, value: boolean) => {
    setParams({ [key]: value ? 'true' : 'false' });
  };

  /** 개별 파라미터 삭제 */
  const removeParam = (key: string) => {
    setParams({ [key]: null });
  };

  /** 모든 파라미터 삭제 */
  const clearParams = () => {
    const currentParams = getParams();

    const preservedParams = Object.fromEntries(
      Object.entries(currentParams).filter(([key]) =>
        (PRESERVE_PARAMS as readonly string[]).includes(key),
      ),
    );

    const queryString = new URLSearchParams(preservedParams).toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  /** 필터링 탭에 나타나는 파라미터 (정렬, 모집글만 보기, 프로젝트 타입, 페이지 제외) */
  const filterParams = Object.entries(getParams()).filter(
    ([key]) => !(PRESERVE_PARAMS as readonly string[]).includes(key),
  );
  /** 쿼리 스트링 생성 */
  const getApiQueryString = () => {
    const params = new URLSearchParams();

    searchParams.forEach((value, key) => {
      if (key === 'roles') {
        const label = ROLE[value as keyof typeof ROLE];
        if (label) params.append(key, label);
      } else if (key === 'interests') {
        const label = INTERESTS[value as keyof typeof INTERESTS];
        if (label) params.append(key, label);
      } else if (key === 'page') {
        params.append(key, String(getValidPage(value) - 1));
      } else {
        params.append(key, value);
      }
    });

    return params.toString();
  };

  return {
    params: getParams(),
    getParam,
    getArrayParam,
    filterParams,
    setParams,
    getBoolParam,
    setBoolParam,
    removeParam,
    clearParams,
    getApiQueryString,
  };
}
