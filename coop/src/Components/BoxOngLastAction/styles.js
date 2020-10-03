import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px 24px;
  width: calc(50% - 8px);
  border-radius: 32px;
  background: var(--cinza-claro);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 14px;
    font-weight: 300;
    color: var(--preto);
    line-height: 20px;
  }
`;

export const Header = styled.header`
  width: 100%;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 48px;
    margin-right: 8px;
  }

  h3 {
    margin-bottom: 2px;
    font-size: 13px;
    font-weight: 700;
    color: var(--roxo);
  }

  button {
    max-width: 90px;
    margin-left: auto;
    height: 24px;
    font-size: 12px;
  }
`;

export const Foto = styled.div`
  width: 100%;
  margin: 16px 0;

  img {
    width: 100%;
  }
`;