import styled from 'styled-components';

export const ChatBotContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

export const ChatBody = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
`;

export const ChatFooter = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #e9ecef;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;

export const MessageInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    margin-right: 10px;
`;

export const SendButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;