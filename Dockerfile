# Sử dụng image Node.js chính thức
FROM node:14

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Biên dịch TypeScript thành JavaScript
RUN npm run build

# Mở port ứng dụng
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["node", "dist/index.js"]
