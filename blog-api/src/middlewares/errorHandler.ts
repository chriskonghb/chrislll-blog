import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: '数据验证失败',
      errors: err.errors,
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      message: '该资源已存在',
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      message: '资源不存在',
    });
  }

  res.status(err.status || 500).json({
    message: err.message || '服务器内部错误',
  });
};
