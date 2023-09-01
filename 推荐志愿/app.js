new Vue({
    el: '#app',
    data: {
        rank: localStorage.getItem('userRanking') || '', 
        displayedRecommendations: [],
    selectedCategory: '',
    categories: ['哲学', '经济学', '法学', '工学', '医学', '艺术学'],
        

        selectedSchoolLevel: '',
        schoolLevels: ['双一流','研究生院','民办高校','独立学院','中外合作办学','内地与港澳台地区合作办学'],

        selectedProvince: '',
        provinces: [  '湖南',
        '广东',
        '广西',
        '海南',
        '重庆',
        '四川',
        '贵州',
        '云南',
        '西藏',
        '陕西',
        '甘肃',
        '青海',
        '宁夏',
        '新疆',
        '北京',
        '天津',
        '河北',
        '山西',
        '内蒙古',
        '辽宁',
        '吉林',
        '黑龙江',
        '上海',
        '江苏',
        '浙江',
        '安徽',
        '福建',
        '江西',
        '山东',
        '河南',
        '湖北'
      
        ],

        sortOrder: 'asc'
    },
    created() {
        axios.get(`https://www.plys.love:7777/remote/getSchool?rank=${this.rank}`) 
        .then(response => {
            console.log("请求成功");
            console.log(response.data);  // 获取响应数据
    
            // 修改这里：从response.data.data获取数据
            this.displayedRecommendations = response.data.data.map(item => ({
                createBy: item.createBy,
                createTime: item.createTime,
                updateBy: item.updateBy,
                updateTime: item.updateTime,
                remark: item.remark,
                id: item.id,
                schoolCode: item.schoolCode,
                schoolName: item.schoolName,
                schoolImage: item.schoolImage,
                schoolRegion: item.schoolRegion,
                schoolRank: item.schoolRank,
                schoolType: item.schoolType,
                schoolAny: item.schoolAny,
                schoolAll: item.schoolAll,
                schoolMust: item.schoolMust,
                schoolCate: item.schoolCate,
                schoolCate1: item.schoolCate1,
                schoolMajor: item.schoolMajor,
                schoolMajorcode: item.schoolMajorcode,
                schoolPlan: item.schoolPlan,
                schoolDuration: item.schoolDuration,
                schoolFee: item.schoolFee,
                schoolNoi: item.schoolNoi,
                schoolAos: item.schoolAos,
                schoolLevel: item.schoolLevel,
                schoolScore: item.schoolScore,
                schoolRanking: item.schoolRanking,
                schoolRankhigh: item.schoolRankhigh,
                schoolRanklow: item.schoolRanklow,
                schoolBackup1: item.schoolBackup1,
                schoolBackup2: item.schoolBackup2,
                schoolBackup3: item.schoolBackup3
            }));
            
        })
        .catch(error => {
            console.error("数据获取失败:", error);
        });
    },
    
    computed: {
        sortedAndFilteredRecommendations() {
            return this.displayedRecommendations.filter(rec => {
                if (this.selectedProvince && this.selectedProvince !== rec.schoolRegion) {
                    return false;
                }
                if (this.selectedCategory && this.selectedCategory !== rec.schoolCate) {
                    return false;
                }
                if (this.selectedSchoolLevel && this.selectedSchoolLevel !== rec.schoolType) {
                    return false;
                }
               
                return true;
             })
            //.sort((a, b) => {
            //     if (!a.schoolRank || !b.schoolRank) return 0;
            //     return this.sortOrder === 'asc' ? a.schoolRank - b.schoolRank : b.schoolRank - a.schoolRank;
            // });
        }
    }
});






