// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // 헤더 스크롤 효과
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // 페르소나 탭 전환
    const personaTabs = document.querySelectorAll('.persona-tab');
    
    if (personaTabs.length > 0) {
        personaTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                personaTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 선택된 페르소나에 따라 콘텐츠 스타일 변경 (실제 구현 시 추가)
                const persona = this.getAttribute('data-persona');
                document.body.setAttribute('data-persona', persona);
            });
        });
    }
    
    // FAQ 아코디언
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // 모든 아이템 닫기
                faqItems.forEach(i => i.classList.remove('active'));
                
                // 클릭한 아이템이 이미 열려있지 않았다면 열기
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // 애니메이션 온 스크롤 (AOS) 모방
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                } else {
                    // 스크롤 업 시 애니메이션 반복을 원한다면 아래 줄 주석 해제
                    // entry.target.classList.remove('aos-animate');
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // 카운터 애니메이션
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 애니메이션 지속 시간 (ms)
                    const stepTime = 20; // 각 스텝 간 시간 (ms)
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        }
                    }, stepTime);
                    
                    // 한 번만 실행하도록 옵저버에서 제거
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // 토큰 분배 차트 (Chart.js 필요)
    const distributionChart = document.getElementById('distributionChart');
    
    if (distributionChart && typeof Chart !== 'undefined') {
        new Chart(distributionChart, {
            type: 'doughnut',
            data: {
                labels: ['투자자', '팀 & 어드바이저', '플랫폼 보상', '마케팅 & 파트너십', '예비'],
                datasets: [{
                    data: [40, 20, 25, 10, 5],
                    backgroundColor: [
                        'rgba(106, 152, 240, 0.8)',
                        'rgba(157, 141, 241, 0.8)',
                        'rgba(243, 137, 185, 0.8)',
                        'rgba(108, 234, 212, 0.8)',
                        'rgba(255, 203, 71, 0.8)'
                    ],
                    borderColor: [
                        'rgba(106, 152, 240, 1)',
                        'rgba(157, 141, 241, 1)',
                        'rgba(243, 137, 185, 1)',
                        'rgba(108, 234, 212, 1)',
                        'rgba(255, 203, 71, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(18, 20, 32, 0.9)',
                        titleColor: 'rgba(255, 255, 255, 0.9)',
                        bodyColor: 'rgba(255, 255, 255, 0.7)',
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 수익 계산기
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // 입력값 가져오기
            const amountInput = document.getElementById('investment-amount');
            const stageSelect = document.getElementById('investment-stage');
            const exitSelect = document.getElementById('investment-exit');
            
            if (!amountInput || !stageSelect || !exitSelect) return;
            
            const amount = parseFloat(amountInput.value) || 5000000; // 기본값 500만원
            const stage = parseInt(stageSelect.value) || 1;
            const exit = parseInt(exitSelect.value) || 1;
            
            // 초기 토큰 가격 (원)
            const initialPrice = 420; // 0.3달러 (1달러 = 1,400원)
            
            // 보너스율
            let bonus = 0;
            if (stage === 1) bonus = 0.1; // 10% 보너스
            else if (stage === 2) bonus = 0.05; // 5% 보너스
            
            // 토큰 수량 계산
            const tokens = amount / initialPrice;
            const bonusTokens = tokens * bonus;
            const totalTokens = tokens + bonusTokens;
            
            // 회수 시점의 토큰 가격 (원)
            let exitPrice = 0;
            if (exit === 1) exitPrice = 1050; // 0.75달러 (1달러 = 1,400원)
            else if (exit === 2) exitPrice = 1680; // 1.2달러 (1달러 = 1,400원)
            
            // 최종 가치 및 수익률 계산
            const finalValue = totalTokens * exitPrice;
            const roi = ((finalValue - amount) / amount) * 100;
            
            // 결과 표시
            const resultValue = document.getElementById('result-value');
            const resultRoi = document.getElementById('result-roi');
            
            if (resultValue && resultRoi) {
                resultValue.textContent = Math.floor(finalValue).toLocaleString() + '원';
                resultRoi.textContent = '(' + Math.floor(roi) + '% 수익률)';
                
                // 수익률에 따른 색상 변경
                if (roi > 0) {
                    resultRoi.style.color = 'var(--accent-mint)';
                } else if (roi < 0) {
                    resultRoi.style.color = 'var(--error)';
                } else {
                    resultRoi.style.color = 'var(--text-tertiary)';
                }
            }
        });
    }
    
    // 카운트다운 타이머
    const countdown = document.getElementById('countdown');
    
    if (countdown) {
        // 목표 날짜 설정 (30일 후)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30);
        
        // 카운트다운 업데이트 함수
        function updateCountdown() {
            const currentDate = new Date();
            const diff = targetDate - currentDate;
            
            // 차이가 0보다 크면 카운트다운 계속
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                // 표시 업데이트
                document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
                document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
            } else {
                // 카운트다운 종료
                document.getElementById('countdown-days').textContent = '00';
                document.getElementById('countdown-hours').textContent = '00';
                document.getElementById('countdown-minutes').textContent = '00';
                document.getElementById('countdown-seconds').textContent = '00';
            }
        }
        
        // 초기 업데이트 및 1초마다 업데이트
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // 투자 모달
    const investModalTriggers = document.querySelectorAll('[data-toggle="modal"][data-target="#investModal"]');
    const modalCloseButtons = document.querySelectorAll('[data-dismiss="modal"]');
    const investModal = document.getElementById('investModal');
    
    if (investModalTriggers.length > 0 && investModal) {
        investModalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                investModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // 모달 외부 클릭 시 닫기
        investModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // 투자 금액 직접 입력 옵션
    const investorAmount = document.getElementById('investor-amount');
    const customAmountGroup = document.getElementById('custom-amount-group');
    
    if (investorAmount && customAmountGroup) {
        investorAmount.addEventListener('change', function() {
            if (this.value === 'custom') {
                customAmountGroup.style.display = 'block';
            } else {
                customAmountGroup.style.display = 'none';
            }
        });
    }
    
    // 투자 신청 양식 제출
    const investForm = document.getElementById('investForm');
    
    if (investForm) {
        investForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 양식 데이터 수집 및 처리 (실제 구현 시 추가)
            const name = document.getElementById('investor-name').value;
            const email = document.getElementById('investor-email').value;
            const phone = document.getElementById('investor-phone').value;
            
            // 투자 금액 계산
            let amount = 0;
            const amountSelect = document.getElementById('investor-amount');
            const customAmount = document.getElementById('custom-amount');
            
            if (amountSelect.value === 'custom' && customAmount) {
                amount = parseFloat(customAmount.value) || 5000000;
            } else {
                amount = parseFloat(amountSelect.value) || 5000000;
            }
            
            // 투자 단계
            const stage = document.getElementById('investment-stage').value;
            
            // 여기서 양식 제출 처리 (API 호출 등)
            console.log('투자 신청 정보:', { name, email, phone, amount, stage });
            
            // 성공 메시지 표시 및 모달 닫기
            alert('투자 신청이 완료되었습니다. 담당자가 곧 연락드릴 예정입니다.');
            
            // 모달 닫기
            const modal = document.getElementById('investModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // 양식 초기화
            investForm.reset();
        });
    }
    
    // 스크롤 애니메이션
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 헤더 높이 고려
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // URL 해시 업데이트
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // 첫 로딩 시 URL에 해시가 있으면 해당 섹션으로 스크롤
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            // 약간의 지연 후 스크롤 (페이지 로딩 완료 후)
            setTimeout(() => {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});