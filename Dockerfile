FROM ccr.ccs.tencentyun.com/common/nginx:1.118
COPY build/ /usr/share/nginx/html/newboss-ui/
COPY nginx.conf /etc/nginx/conf.d/default.conf
