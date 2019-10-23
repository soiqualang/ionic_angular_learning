-- Adminer 4.6.3 PostgreSQL dump

DROP TABLE IF EXISTS "cong_hientrang_point";
CREATE TABLE "public"."cong_hientrang_point" (
    "id" character varying NOT NULL,
    "ghichu_ten" character varying,
    "maso_cong" character varying,
    "ghichu_kiemtra" character varying,
    "x" numeric,
    "y" numeric,
    "wkt" character varying,
    CONSTRAINT "cong_hientrang_point_id" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "dap_hientrang_point";
CREATE TABLE "public"."dap_hientrang_point" (
    "id" character varying NOT NULL,
    "ten_dap" character varying,
    "ma_loai" character varying,
    "x" numeric,
    "y" numeric,
    "wkt" character varying,
    CONSTRAINT "dap_hientrang_point_id" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "hinhanh";
DROP SEQUENCE IF EXISTS hinhanh_id_seq;
CREATE SEQUENCE hinhanh_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."hinhanh" (
    "id" integer DEFAULT nextval('hinhanh_id_seq') NOT NULL,
    "img" text,
    "takedate" date,
    "id_congtrinh" character varying,
    "tbl_name" character varying
) WITH (oids = false);


-- 2019-10-23 17:25:26.841245+07
