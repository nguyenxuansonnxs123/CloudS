import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="font-display text-6xl text-ink">404</p>
      <h1 className="font-display text-2xl text-ink">Không tìm thấy trang này</h1>
      <p className="max-w-sm text-sm text-ink-soft">
        Trang bạn tìm không tồn tại hoặc đã được di chuyển. Quay lại trang chủ để tiếp tục
        khám phá CloudS.
      </p>
      <Button href="/" className="mt-2">
        Về trang chủ
      </Button>
    </Container>
  );
}
