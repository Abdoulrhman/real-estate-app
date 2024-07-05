const mockAxios = jest.genMockFromModule('axios');

mockAxios.put = jest.fn(() => Promise.resolve({ data: {} }));

export default mockAxios;
