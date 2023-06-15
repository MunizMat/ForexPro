import api from "../../../../src/lib/config/axios";

describe('axios/api configuration', () => {
    it('should have correct configs', () => {

        expect(api.defaults.baseURL).toBe('http://localhost:3001');
    })
});