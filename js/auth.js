// 认证管理模块
const Auth = {
    // 检查用户是否已登录
    isLoggedIn() {
        return localStorage.getItem('user') !== null;
    },

    // 获取当前用户信息
    getCurrentUser() {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
    },

    // 登录
    login(userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        this.updateNavbar();
    },

    // 登出
    logout() {
        localStorage.removeItem('user');
        this.updateNavbar();
    },

    // 更新导航栏显示
    updateNavbar() {
        const userActions = document.querySelector('.user-actions');
        if (!userActions) return;

        if (this.isLoggedIn()) {
            const user = this.getCurrentUser();
            userActions.innerHTML = `
                <button class="hidden md:block px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors">
                    <i class="fa fa-search mr-2"></i>搜索
                </button>
                <!-- 登录后显示用户菜单 -->
                <div class="relative group">
                    <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                        <img src="?prompt=profile%20picture%20of%20a%20gamer%20${user.gender || 'male'}%2C%20realistic&image_size=square" alt="User" class="w-8 h-8 rounded-full">
                        <span class="hidden md:inline">${user.username}</span>
                        <i class="fa fa-chevron-down text-xs"></i>
                    </button>
                    <!-- 下拉菜单 -->
                    <div class="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div class="py-2">
                            <a href="dashboard.html" class="block px-4 py-2 hover:bg-gray-700/50 transition-colors">
                                <i class="fa fa-user-circle mr-2"></i> 个人中心
                            </a>
                            <a href="profile.html" class="block px-4 py-2 hover:bg-gray-700/50 transition-colors">
                                <i class="fa fa-cog mr-2"></i> 账号设置
                            </a>
                            <a href="messages.html" class="block px-4 py-2 hover:bg-gray-700/50 transition-colors">
                                <i class="fa fa-envelope mr-2"></i> 消息通知
                            </a>
                            <a href="download-history.html" class="block px-4 py-2 hover:bg-gray-700/50 transition-colors">
                                <i class="fa fa-download mr-2"></i> 下载历史
                            </a>
                            <a href="favorites.html" class="block px-4 py-2 hover:bg-gray-700/50 transition-colors">
                                <i class="fa fa-heart mr-2"></i> 我的收藏
                            </a>
                            <div class="border-t border-gray-700 my-1"></div>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-700/50 transition-colors text-red-400" onclick="Auth.logout(); window.location.href='index.html';">
                                <i class="fa fa-sign-out mr-2"></i> 退出登录
                            </a>
                        </div>
                    </div>
                </div>
                <button class="md:hidden text-xl">
                    <i class="fa fa-bars"></i>
                </button>
            `;
        } else {
            userActions.innerHTML = `
                <button class="hidden md:block px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors">
                    <i class="fa fa-search mr-2"></i>搜索
                </button>
                <a href="login.html" class="px-4 py-2 rounded-lg border border-gray-700 hover:border-primary transition-colors">
                    登录
                </a>
                <a href="register.html" class="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors">
                    注册
                </a>
                <button class="md:hidden text-xl">
                    <i class="fa fa-bars"></i>
                </button>
            `;
        }
    },

    // 初始化认证状态
    init() {
        this.updateNavbar();
    }
};

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Auth.init());
} else {
    Auth.init();
}