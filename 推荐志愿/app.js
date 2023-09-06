new Vue({
    el: '#app',
    data: {
        isLoggedOut: false,
        rank: localStorage.getItem('userRanking') || '', 
        displayedRecommendations: [],

        expandedMajors: {},

        
        selectedCategory: '全部',
        selectedSchoolLevel: '全部',
        selectedProvince: '全部',
        categories: ['医学', '经济学', '法学', '管理学', '工学', '文学', '理学', '哲学', '历史学', '教育学', '农学', '艺术学', '财经商贸大类', '医药卫生大类', '教育与体育大类', '旅游大类', '电子与信息大类', '公共管理与服务大类', '公安与司法大类', '装备制造大类', '土木建筑大类', '生物与化工大类', '资源环境与安全大类', '交通运输大类', '食品药品与粮食大类', '农林牧渔大类', '新闻传播大类', '能源动力与材料大类', '文化艺术大类', '水利大类', '轻工纺织大类'
],
        schoolLevels: ["全部",'双一流','985','211'],


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
        const subjectsString = JSON.parse(localStorage.getItem('userChosenSubjects') || '[]').join(',');
        
        axios.get(`http://47.98.244.209:5000/api/schools?rank=${this.rank}&subjects=${subjectsString}`)
            .then(response => {
                console.log("完整响应：", response);
                console.log("请求成功");
                console.log(response.data); // 获取响应数据
    
            // 修改这里：从response.data.data获取数据
            this.displayedRecommendations = response.data.map(item => ({
                // createBy: item.createBy,
                // createTime: item.createTime,
                // updateBy: item.updateBy,
                // updateTime: item.updateTime,
                // remark: item.remark,
                // id: item.id,
                // schoolCode: item.schoolCode,
                //  schoolName: item.schoolName,
                //  schoolImage: item.schoolImage,
                // schoolRegion: item.schoolRegion,
                // schoolRank: item.schoolRank,
                // schoolType: item.schoolType,
                // schoolAny: item.schoolAny,
                // schoolAll: item.schoolAll,
                // schoolMust: item.schoolMust,
                // schoolCate: item.schoolCate,
                // schoolCate1: item.schoolCate1,
                // schoolMajor: item.schoolMajor,
                // schoolMajorcode: item.schoolMajorcode,
                // schoolPlan: item.schoolPlan,
                // schoolDuration: item.schoolDuration,
                // schoolFee: item.schoolFee,
                // schoolNoi: item.schoolNoi,
                // schoolAos: item.schoolAos,
                // schoolLevel: item.schoolLevel,
                // schoolScore: item.schoolScore,
                // schoolRanking: item.schoolRanking,
                // schoolRankhigh: item.schoolRankhigh,
                // schoolRanklow: item.schoolRanklow,
                // schoolBackup1: item.schoolBackup1,
                // schoolBackup2: item.schoolBackup2,
                // schoolBackup3: item.schoolBackup3
             
                id: item.id, // This also remains the same
                schoolCode: item.school_code,
                schoolName: item.school_name,
                schoolImage: item.school_image,
                schoolRegion: item.school_region,
                schoolRank: item.school_rank,
                schoolType: item.school_type,
                schoolAny: item.school_any,
                schoolAll: item.school_all,
                schoolMust: item.school_must,
                schoolCate: item.school_cate,
                schoolCate1: item.school_cate1,
                schoolMajor: item.school_major,
                schoolMajorcode: item.school_majorcode,
                schoolPlan: item.school_plan,
                schoolDuration: item.school_duration,
                schoolFee: item.school_fee,
                schoolNoi: item.school_noi,
                schoolAos: item.school_aos,
                schoolLevel: item.school_level,
                schoolScore: item.school_score,
                schoolRanking: item.school_ranking,
                schoolRankhigh: item.school_rankhigh,
                schoolRanklow: item.school_ranklow,
                schoolBackup1: item.school_backup1,
                schoolBackup2: item.school_backup2,
                schoolBackup3: item.school_backup3
               

            }));
            
        })
        .catch(error => {
            console.error("数据获取失败:", error);
        });
    },
    
     
    computed: {
        sortedAndFilteredRecommendations() {
            let selectedSL = this.selectedSchoolLevel;
            let selectedP = this.selectedProvince;
            let selectedCate=this.selectedCategory;
            let order=this.sortOrder;
            console.log(selectedSL,selectedCate,selectedP);
            return this.displayedRecommendations.filter(rec => {
                return ((selectedP==="全部") || (selectedP === rec.schoolRegion)) &&
                       ((selectedCate==="全部") || (selectedCate === rec.schoolCate)) &&
                    ((selectedSL==="全部") || (rec.schoolType.indexOf(selectedSL) !== -1));
            })
            .sort((a, b) => {
                const rankA = a.schoolRank || 0;
                const rankB = b.schoolRank || 0;
                return order=== 'asc' ? rankA - rankB : rankB - rankA;
            });
        }
        
        
    },
    methods: {
        logoutUser() {
            fetch('/logout', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location.href = "../用户界面/登录界面.html"; 
                } else {
                    alert("注销失败!");
                }
            });
        },
        toggleMajor(id) {
            this.$set(this.expandedMajors, id, !this.expandedMajors[id]);
        }
        
        
    }
    

});

