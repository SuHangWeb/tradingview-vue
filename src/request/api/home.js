import $http from '@/request';

let api = {
    /**
     * 测试get
     */
    get: function() {
        return $http.get('/api/test');
    },
    /**
     * 测试post
     */
    post: function(data) {
        return $http.post('/api/test', data);
    },
    
    /**
     * 测试 put
     */
    put: function(id) {
        return $http.put(`/api/address/${id}`);
    },

    /**
     * delete 测试
     */
    delete: function(id) {
        return $http.delete(`/api/address/${id}`);
    }
}

export default api